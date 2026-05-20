"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

const DRAG_THRESHOLD_PX = 5
const RESIZE_THRESHOLD_PX = 3
const DIALOG_BASE_Z = 50
const DIALOG_Z_STEP = 10
const DIALOG_MIN_WIDTH = 260
const DIALOG_MIN_HEIGHT = 180
const DIALOG_DEFAULT_WIDTH = 360
const DIALOG_DEFAULT_HEIGHT = 420

const DRAG_IGNORE_SELECTOR =
  'button, a, input, textarea, select, label, [role="button"], [role="link"], [contenteditable="true"], [data-slot="dialog-close"], [data-slot="dialog-resize-handle"]'

type ResizeAxis = "e" | "s" | "se"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function getViewportLimits() {
  if (typeof window === "undefined") {
    return { maxWidth: 1200, maxHeight: 900 }
  }
  return {
    maxWidth: window.innerWidth - 16,
    maxHeight: window.innerHeight - 16,
  }
}

const DialogLayerContext = React.createContext(0)

type DialogContentConfig = {
  title: string
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  draggable?: boolean
  style?: React.CSSProperties
  onInteractOutside?: React.ComponentProps<
    typeof DialogPrimitive.Content
  >["onInteractOutside"]
  contentProps?: Omit<
    React.ComponentProps<typeof DialogPrimitive.Content>,
    "onInteractOutside"
  >
}

type DialogContentRef = {
  current: DialogContentConfig | null
  subscribe: (listener: () => void) => () => void
  set: (content: DialogContentConfig) => void
}

function createDialogContentRef(): DialogContentRef {
  const listeners = new Set<() => void>()
  const store: DialogContentRef = {
    current: null,
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    set: (content) => {
      const previous = store.current
      store.current = content
      const metaChanged =
        previous?.title !== content.title ||
        previous?.className !== content.className
      if (metaChanged) {
        listeners.forEach((listener) => listener())
      }
    },
  }
  return store
}

type MountedDialog = {
  contentRef: DialogContentRef
  layer: number
  modal: boolean
  onOpenChange: (open: boolean) => void
}

interface DialogStackContextValue {
  register: (id: string) => void
  unregister: (id: string) => void
  stackSize: number
  mountDialog: (id: string, dialog: MountedDialog) => void
  unmountDialog: (id: string) => void
}

const DialogStackContext = React.createContext<DialogStackContextValue | null>(
  null
)

const DialogRegistrationContext = React.createContext<{
  isOpen: boolean
  setContentRef: (content: DialogContentConfig) => void
} | null>(null)

function useDialogStack() {
  const context = React.useContext(DialogStackContext)
  if (!context) {
    throw new Error("useDialogStack must be used within DialogStackProvider")
  }
  return context
}

function useDialogInteraction() {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [size, setSize] = React.useState<{ width: number; height: number } | null>(
    null
  )
  const [isGrabbed, setIsGrabbed] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [resizeGrabbed, setResizeGrabbed] = React.useState(false)
  const [isResizing, setIsResizing] = React.useState(false)
  const [resizeAxis, setResizeAxis] = React.useState<ResizeAxis | null>(null)

  const offsetRef = React.useRef(offset)
  const sizeRef = React.useRef(size)
  const sizeLockedRef = React.useRef(false)
  const positionerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
    active: boolean
  } | null>(null)
  const resizeRef = React.useRef<{
    pointerId: number
    axis: ResizeAxis
    startX: number
    startY: number
    startWidth: number
    startHeight: number
    startOffsetX: number
    startOffsetY: number
    active: boolean
  } | null>(null)

  offsetRef.current = offset
  sizeRef.current = size

  const resetDialogState = React.useCallback(() => {
    setOffset({ x: 0, y: 0 })
    setSize(null)
    setIsGrabbed(false)
    setIsDragging(false)
    setResizeGrabbed(false)
    setIsResizing(false)
    setResizeAxis(null)
    sizeLockedRef.current = false
    dragRef.current = null
    resizeRef.current = null
  }, [])

  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const observer = new MutationObserver(() => {
      if (el.getAttribute("data-state") === "closed") {
        resetDialogState()
      }
    })

    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] })
    return () => observer.disconnect()
  }, [resetDialogState])

  React.useLayoutEffect(() => {
    if (sizeLockedRef.current) return

    const lockInitialSize = () => {
      if (sizeLockedRef.current) return

      const positioner = positionerRef.current
      if (positioner) {
        const rect = positioner.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          sizeLockedRef.current = true
          setSize({
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          })
          return
        }
      }

      sizeLockedRef.current = true
      setSize({
        width: DIALOG_DEFAULT_WIDTH,
        height: DIALOG_DEFAULT_HEIGHT,
      })
    }

    lockInitialSize()
    requestAnimationFrame(lockInitialSize)
  }, [])

  const ensureSize = React.useCallback(() => {
    const positioner = positionerRef.current
    if (!positioner) return { width: 320, height: 360 }

    const rect = positioner.getBoundingClientRect()
    const next = {
      width: Math.round(sizeRef.current?.width ?? rect.width),
      height: Math.round(sizeRef.current?.height ?? rect.height),
    }
    setSize(next)
    return next
  }, [])

  const handleDragPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return
      if ((event.target as HTMLElement).closest(DRAG_IGNORE_SELECTOR)) return

      event.preventDefault()
      event.stopPropagation()

      const handle = event.currentTarget
      const pointerId = event.pointerId
      handle.setPointerCapture?.(pointerId)
      setIsGrabbed(true)

      dragRef.current = {
        pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: offsetRef.current.x,
        originY: offsetRef.current.y,
        active: false,
      }

      const onPointerMove = (moveEvent: PointerEvent) => {
        const drag = dragRef.current
        if (!drag || moveEvent.pointerId !== pointerId) return

        const deltaX = moveEvent.clientX - drag.startX
        const deltaY = moveEvent.clientY - drag.startY

        if (!drag.active) {
          if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return
          drag.active = true
          setIsDragging(true)
        }

        moveEvent.preventDefault()
        setOffset({
          x: drag.originX + deltaX,
          y: drag.originY + deltaY,
        })
      }

      const endDrag = () => {
        const wasDragged = dragRef.current?.active ?? false
        dragRef.current = null
        setIsGrabbed(false)
        setIsDragging(false)

        if (handle.hasPointerCapture?.(pointerId)) {
          handle.releasePointerCapture(pointerId)
        }

        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", endDrag)
        window.removeEventListener("pointercancel", endDrag)

        if (wasDragged) {
          const suppressClick = (clickEvent: MouseEvent) => {
            clickEvent.preventDefault()
            clickEvent.stopPropagation()
            window.removeEventListener("click", suppressClick, true)
          }
          window.addEventListener("click", suppressClick, true)
        }
      }

      window.addEventListener("pointermove", onPointerMove, { passive: false })
      window.addEventListener("pointerup", endDrag)
      window.addEventListener("pointercancel", endDrag)
    },
    []
  )

  const handleResizePointerDown = React.useCallback(
    (axis: ResizeAxis, event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return

      event.preventDefault()
      event.stopPropagation()

      const handle = event.currentTarget
      const pointerId = event.pointerId
      const { width: startWidth, height: startHeight } = ensureSize()

      handle.setPointerCapture?.(pointerId)
      setResizeGrabbed(true)
      setResizeAxis(axis)

      resizeRef.current = {
        pointerId,
        axis,
        startX: event.clientX,
        startY: event.clientY,
        startWidth,
        startHeight,
        startOffsetX: offsetRef.current.x,
        startOffsetY: offsetRef.current.y,
        active: false,
      }

      const onPointerMove = (moveEvent: PointerEvent) => {
        const resize = resizeRef.current
        if (!resize || moveEvent.pointerId !== pointerId) return

        const deltaX = moveEvent.clientX - resize.startX
        const deltaY = moveEvent.clientY - resize.startY

        if (!resize.active) {
          const moved =
            resize.axis === "e"
              ? Math.abs(deltaX)
              : resize.axis === "s"
                ? Math.abs(deltaY)
                : Math.hypot(deltaX, deltaY)
          if (moved < RESIZE_THRESHOLD_PX) return
          resize.active = true
          setIsResizing(true)
        }

        moveEvent.preventDefault()

        const { maxWidth, maxHeight } = getViewportLimits()
        let nextWidth = resize.startWidth
        let nextHeight = resize.startHeight
        let nextOffsetX = resize.startOffsetX
        let nextOffsetY = resize.startOffsetY

        if (resize.axis === "e" || resize.axis === "se") {
          nextWidth = clamp(
            resize.startWidth + deltaX,
            DIALOG_MIN_WIDTH,
            maxWidth
          )
          nextOffsetX =
            resize.startOffsetX + (nextWidth - resize.startWidth) / 2
        }
        if (resize.axis === "s" || resize.axis === "se") {
          nextHeight = clamp(
            resize.startHeight + deltaY,
            DIALOG_MIN_HEIGHT,
            maxHeight
          )
          nextOffsetY =
            resize.startOffsetY + (nextHeight - resize.startHeight) / 2
        }

        setSize({ width: nextWidth, height: nextHeight })
        setOffset({ x: nextOffsetX, y: nextOffsetY })
      }

      const endResize = () => {
        resizeRef.current = null
        setResizeGrabbed(false)
        setIsResizing(false)
        setResizeAxis(null)

        if (handle.hasPointerCapture?.(pointerId)) {
          handle.releasePointerCapture(pointerId)
        }

        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", endResize)
        window.removeEventListener("pointercancel", endResize)
      }

      window.addEventListener("pointermove", onPointerMove, { passive: false })
      window.addEventListener("pointerup", endResize)
      window.addEventListener("pointercancel", endResize)
    },
    [ensureSize]
  )

  return {
    positionerRef,
    contentRef,
    offset,
    size,
    isGrabbed,
    isDragging,
    resizeGrabbed,
    isResizing,
    resizeAxis,
    handleDragPointerDown,
    handleResizePointerDown,
  }
}

function DialogResizeHandles({
  resizeGrabbed,
  isResizing,
  resizeAxis,
  onResizePointerDown,
}: {
  resizeGrabbed: boolean
  isResizing: boolean
  resizeAxis: ResizeAxis | null
  onResizePointerDown: (
    axis: ResizeAxis,
    event: React.PointerEvent<HTMLDivElement>
  ) => void
}) {
  const isActiveResize = resizeGrabbed || isResizing
  const handleBase =
    "absolute z-20 touch-none select-none transition-colors duration-150"
  const edgeBase =
    "bg-transparent hover:bg-primary/15 active:bg-primary/20"
  const activeEdge = "bg-primary/20"

  return (
    <>
      <div
        data-slot="dialog-resize-handle"
        data-resize-axis="s"
        aria-label="Преоразмери височината"
        className={cn(
          handleBase,
          edgeBase,
          "right-6 bottom-0 left-0 h-5 cursor-ns-resize sm:right-4 sm:h-3",
          (resizeGrabbed || isResizing) && resizeAxis === "s" && activeEdge,
          isResizing && resizeAxis === "s" && "bg-primary/25"
        )}
        onPointerDown={(event) => onResizePointerDown("s", event)}
      >
        <span
          className={cn(
            "absolute bottom-1 left-1/2 hidden h-1 -translate-x-1/2 rounded-full bg-muted-foreground/40 sm:block",
            "w-12",
            isActiveResize && resizeAxis === "s" && "w-16 bg-primary/70"
          )}
        />
        <span
          className={cn(
            "absolute bottom-1.5 left-1/2 block h-1.5 -translate-x-1/2 rounded-full bg-muted-foreground/45 sm:hidden",
            "w-16",
            isActiveResize && resizeAxis === "s" && "w-20 bg-primary"
          )}
        />
      </div>

      <div
        data-slot="dialog-resize-handle"
        data-resize-axis="e"
        aria-label="Преоразмери ширината"
        className={cn(
          handleBase,
          edgeBase,
          "top-14 right-0 bottom-6 w-5 cursor-ew-resize sm:top-11 sm:bottom-4 sm:w-3",
          (resizeGrabbed || isResizing) && resizeAxis === "e" && activeEdge,
          isResizing && resizeAxis === "e" && "bg-primary/25"
        )}
        onPointerDown={(event) => onResizePointerDown("e", event)}
      >
        <span
          className={cn(
            "absolute top-1/2 right-1 hidden h-12 w-1 -translate-y-1/2 rounded-full bg-muted-foreground/40 sm:block",
            isActiveResize && resizeAxis === "e" && "h-16 bg-primary/70"
          )}
        />
        <span
          className={cn(
            "absolute top-1/2 right-1.5 block h-16 w-1.5 -translate-y-1/2 rounded-full bg-muted-foreground/45 sm:hidden",
            isActiveResize && resizeAxis === "e" && "h-20 bg-primary"
          )}
        />
      </div>

      <div
        data-slot="dialog-resize-handle"
        data-resize-axis="se"
        aria-label="Преоразмери ширината и височината"
        className={cn(
          handleBase,
          edgeBase,
          "right-0 bottom-0 flex h-8 w-8 cursor-nwse-resize items-end justify-end rounded-br-xl p-1 sm:h-5 sm:w-5",
          (resizeGrabbed || isResizing) && resizeAxis === "se" && activeEdge,
          isResizing && resizeAxis === "se" && "bg-primary/30"
        )}
        onPointerDown={(event) => onResizePointerDown("se", event)}
      >
        <span
          className={cn(
            "block rounded-sm border-r-2 border-b-2 border-muted-foreground/50 transition-colors",
            "h-3 w-3 sm:h-2.5 sm:w-2.5",
            isActiveResize &&
              resizeAxis === "se" &&
              "border-primary h-4 w-4 sm:h-3 sm:w-3"
          )}
        />
      </div>

      {isActiveResize ? (
        <span className="pointer-events-none absolute right-10 bottom-2 z-30 rounded-md bg-primary/90 px-2 py-0.5 text-[10px] font-medium text-primary-foreground sm:hidden">
          {isResizing ? "Преоразмеряване" : "Задръж и преоразмери"}
        </span>
      ) : null}
    </>
  )
}

function DialogOverlay({
  className,
  style,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 bg-black/10 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      style={style}
      {...props}
    />
  )
}

function DialogContentBody({
  title,
  children,
  className,
  showCloseButton = true,
  draggable = true,
  style,
  onInteractOutside,
  contentProps,
}: DialogContentConfig) {
  const layer = React.useContext(DialogLayerContext)
  const {
    positionerRef,
    contentRef,
    offset,
    size,
    isGrabbed,
    isDragging,
    resizeGrabbed,
    isResizing,
    resizeAxis,
    handleDragPointerDown,
    handleResizePointerDown,
  } = useDialogInteraction()

  const zIndex = DIALOG_BASE_Z + layer * DIALOG_Z_STEP
  const showOverlay = false
  const isActiveDrag = isGrabbed || isDragging
  const isActiveResize = resizeGrabbed || isResizing
  const isInteracting = isActiveDrag || isActiveResize

  return (
    <DialogPortal>
      {showOverlay ? (
        <DialogOverlay style={{ zIndex: zIndex - 1 }} />
      ) : null}
      <div
        ref={positionerRef}
        data-slot="dialog-positioner"
        data-grabbed={isGrabbed || undefined}
        data-dragging={isDragging || undefined}
        data-resize-grabbed={resizeGrabbed || undefined}
        data-resizing={isResizing || undefined}
        className={cn(
          "fixed top-1/2 left-1/2 transition-[box-shadow,transform] duration-150",
          !size && "w-[calc(100vw-2rem)] max-w-sm sm:max-w-md",
          isGrabbed && "drop-shadow-lg",
          isDragging && "drop-shadow-2xl",
          isActiveResize && "drop-shadow-xl"
        )}
        style={{
          zIndex,
          left: draggable ? `calc(50% + ${offset.x}px)` : "50%",
          top: draggable ? `calc(50% + ${offset.y}px)` : "50%",
          transform: "translate(-50%, -50%)",
          width: size?.width,
          height: size?.height,
        }}
      >
        <DialogPrimitive.Content
          ref={contentRef}
          data-slot="dialog-content"
          data-grabbed={isGrabbed || undefined}
          data-dragging={isDragging || undefined}
          data-resize-grabbed={resizeGrabbed || undefined}
          data-resizing={isResizing || undefined}
          style={style}
          className={cn(
            "relative flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-xl bg-popover text-sm text-popover-foreground ring-1 ring-foreground/10 duration-150 outline-none",
            !size && "max-h-[min(85dvh,calc(100dvh-2rem))]",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            isGrabbed && "ring-2 ring-primary/50 shadow-md",
            isDragging && "ring-2 ring-primary shadow-xl scale-[1.01]",
            isActiveResize && "ring-2 ring-primary/60 shadow-lg",
            isResizing && "ring-2 ring-primary shadow-xl",
            className
          )}
          onInteractOutside={(event) => {
            const target = event.target as HTMLElement
            if (target.closest("[data-slot='dialog-content']")) {
              event.preventDefault()
            }
            onInteractOutside?.(event)
          }}
          {...contentProps}
        >
          {draggable ? (
            <div
              data-slot="dialog-drag-handle"
              aria-label="Премести прозореца"
              data-grabbed={isGrabbed || undefined}
              data-dragging={isDragging || undefined}
              className={cn(
                "relative z-10 flex shrink-0 touch-none cursor-grab flex-col items-center justify-center gap-1 rounded-t-xl border-b transition-colors duration-150 select-none",
                "h-12 sm:h-9",
                "border-border/30 bg-muted/35 active:cursor-grabbing sm:bg-muted/20",
                isGrabbed &&
                  "cursor-grabbing border-primary/40 bg-primary/10",
                isDragging &&
                  "cursor-grabbing border-primary/60 bg-primary/15"
              )}
              onPointerDown={handleDragPointerDown}
            >
              <span
                className={cn(
                  "block rounded-full bg-muted-foreground/45 transition-all duration-150",
                  "h-1.5 w-14 sm:h-1 sm:w-10",
                  isGrabbed && "w-16 bg-primary/70",
                  isDragging && "w-20 bg-primary"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide text-muted-foreground uppercase transition-opacity duration-150 sm:hidden",
                  isGrabbed ? "text-primary opacity-100" : "opacity-70",
                  isDragging && "text-primary"
                )}
              >
                {isDragging ? "Премества се" : "Задръж и влачи"}
              </span>
            </div>
          ) : null}
          <DialogResizeHandles
            resizeGrabbed={resizeGrabbed}
            isResizing={isResizing}
            resizeAxis={resizeAxis}
            onResizePointerDown={handleResizePointerDown}
          />
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div
            data-slot="dialog-scroll-body"
            className={cn(
              "min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-4",
              isInteracting && "overflow-y-hidden"
            )}
          >
            {children}
          </div>
          {showCloseButton ? (
            <DialogPrimitive.Close data-slot="dialog-close" asChild>
              <Button
                variant="ghost"
                className="absolute top-2 right-2 z-30 cursor-default"
                size="icon-sm"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </Button>
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  )
}

function RootDialogInstance({
  id,
  dialog,
  onClose,
}: {
  id: string
  dialog: MountedDialog
  onClose: (id: string) => void
}) {
  const [, setRenderTick] = React.useState(0)

  React.useEffect(() => {
    return dialog.contentRef.subscribe(() => {
      setRenderTick((tick) => tick + 1)
    })
  }, [dialog.contentRef])

  const handleOpenChange = (open: boolean) => {
    dialog.onOpenChange(open)
    if (!open) {
      onClose(id)
    }
  }

  const content = dialog.contentRef.current
  if (!content) return null

  return (
    <DialogLayerContext.Provider value={dialog.layer}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open
        onOpenChange={handleOpenChange}
        modal={dialog.modal}
      >
        <DialogContentBody {...content} />
      </DialogPrimitive.Root>
    </DialogLayerContext.Provider>
  )
}

function DialogStackProvider({ children }: { children: React.ReactNode }) {
  const [openIds, setOpenIds] = React.useState<string[]>([])
  const [mountedDialogs, setMountedDialogs] = React.useState<
    Record<string, MountedDialog>
  >({})

  const register = React.useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregister = React.useCallback((id: string) => {
    setOpenIds((prev) => prev.filter((entry) => entry !== id))
  }, [])

  const mountDialog = React.useCallback((id: string, dialog: MountedDialog) => {
    setMountedDialogs((prev) => {
      const existing = prev[id]
      if (
        existing &&
        existing.contentRef === dialog.contentRef &&
        existing.layer === dialog.layer &&
        existing.modal === dialog.modal
      ) {
        return prev
      }
      return { ...prev, [id]: dialog }
    })
  }, [])

  const unmountDialog = React.useCallback((id: string) => {
    setMountedDialogs((prev) => {
      if (!(id in prev)) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const stackValue = React.useMemo(
    () => ({
      register,
      unregister,
      stackSize: openIds.length,
      mountDialog,
      unmountDialog,
    }),
    [register, unregister, openIds.length, mountDialog, unmountDialog]
  )

  return (
    <DialogStackContext.Provider value={stackValue}>
      {children}
      {Object.entries(mountedDialogs).map(([id, dialog]) => (
        <RootDialogInstance
          key={id}
          id={id}
          dialog={dialog}
          onClose={unmountDialog}
        />
      ))}
    </DialogStackContext.Provider>
  )
}

function Dialog({
  modal,
  open,
  defaultOpen,
  onOpenChange,
  children,
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const id = React.useId()
  const parentLayer = React.useContext(DialogLayerContext)
  const { register, unregister, mountDialog, unmountDialog } = useDialogStack()
  const contentRef = React.useRef<DialogContentRef | null>(null)
  if (!contentRef.current) {
    contentRef.current = createDialogContentRef()
  }
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false
  )

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const isNested = parentLayer > 0
  const layer = isOpen ? parentLayer + 1 : parentLayer
  const onOpenChangeRef = React.useRef(onOpenChange)
  onOpenChangeRef.current = onOpenChange

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next)
      }
      onOpenChangeRef.current?.(next)
      if (!next) {
        unmountDialog(id)
      }
    },
    [id, isControlled, unmountDialog]
  )

  const setContentRef = React.useCallback(
    (content: DialogContentConfig) => {
      contentRef.current?.set(content)
    },
    []
  )

  const registrationValue = React.useMemo(
    () => ({
      isOpen,
      setContentRef,
    }),
    [isOpen, setContentRef]
  )

  React.useLayoutEffect(() => {
    if (!isOpen) {
      unmountDialog(id)
      return
    }

    if (!contentRef.current?.current) return

    mountDialog(id, {
      contentRef: contentRef.current,
      layer,
      modal: false,
      onOpenChange: handleOpenChange,
    })
    register(id)

    return () => {
      unregister(id)
    }
  }, [
    isOpen,
    id,
    layer,
    modal,
    isNested,
    mountDialog,
    unmountDialog,
    register,
    unregister,
    handleOpenChange,
  ])

  return (
    <DialogRegistrationContext.Provider value={registrationValue}>
      <DialogLayerContext.Provider value={layer}>
        {children}
      </DialogLayerContext.Provider>
    </DialogRegistrationContext.Provider>
  )
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogContent({
  className,
  children,
  title,
  showCloseButton = true,
  draggable = true,
  style,
  onInteractOutside,
  ...contentProps
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  title: string
  showCloseButton?: boolean
  draggable?: boolean
}) {
  const registration = React.useContext(DialogRegistrationContext)

  React.useLayoutEffect(() => {
    if (!registration) return

    registration.setContentRef({
      title,
      children,
      className,
      showCloseButton,
      draggable,
      style,
      onInteractOutside,
      contentProps,
    })
  })

  if (!registration) {
    return (
      <DialogContentBody
        title={title}
        children={children}
        className={className}
        showCloseButton={showCloseButton}
        draggable={draggable}
        style={style}
        onInteractOutside={onInteractOutside}
        contentProps={contentProps}
      />
    )
  }

  return null
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      ) : null}
    </div>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogStackProvider,
  DialogTitle,
  DialogTrigger,
}
