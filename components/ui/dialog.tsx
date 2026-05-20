"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

const DRAG_THRESHOLD_PX = 5
const DIALOG_BASE_Z = 50
const DIALOG_Z_STEP = 10

const DRAG_IGNORE_SELECTOR =
  'button, a, input, textarea, select, label, [role="button"], [role="link"], [contenteditable="true"], [data-slot="dialog-close"]'

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

function useDraggableDialog() {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const [isGrabbed, setIsGrabbed] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const offsetRef = React.useRef(offset)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const dragRef = React.useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
    active: boolean
  } | null>(null)

  offsetRef.current = offset

  React.useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const observer = new MutationObserver(() => {
      if (el.getAttribute("data-state") === "closed") {
        setOffset({ x: 0, y: 0 })
        setIsGrabbed(false)
        setIsDragging(false)
        dragRef.current = null
      }
    })

    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] })
    return () => observer.disconnect()
  }, [])

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return
      if ((event.target as HTMLElement).closest(DRAG_IGNORE_SELECTOR)) return

      event.stopPropagation()

      const positioner = event.currentTarget
      const pointerId = event.pointerId

      if (positioner.setPointerCapture) {
        positioner.setPointerCapture(pointerId)
      }

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

        if (positioner.hasPointerCapture?.(pointerId)) {
          positioner.releasePointerCapture(pointerId)
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

  return {
    contentRef,
    offset,
    isGrabbed,
    isDragging,
    handlePointerDown,
  }
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
  const { contentRef, offset, isGrabbed, isDragging, handlePointerDown } =
    useDraggableDialog()

  const zIndex = DIALOG_BASE_Z + layer * DIALOG_Z_STEP
  const showOverlay = false
  const isActiveDrag = isGrabbed || isDragging

  return (
    <DialogPortal>
      {showOverlay ? (
        <DialogOverlay style={{ zIndex: zIndex - 1 }} />
      ) : null}
      <div
        data-slot="dialog-positioner"
        data-grabbed={isGrabbed || undefined}
        data-dragging={isDragging || undefined}
        className={cn(
          "fixed top-1/2 left-1/2 w-[calc(100vw-2rem)] max-w-sm transition-[box-shadow,transform] duration-150 sm:max-w-md",
          isGrabbed && "drop-shadow-lg",
          isDragging && "drop-shadow-2xl"
        )}
        style={{
          zIndex,
          left: draggable ? `calc(50% + ${offset.x}px)` : "50%",
          top: draggable ? `calc(50% + ${offset.y}px)` : "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <DialogPrimitive.Content
          ref={contentRef}
          data-slot="dialog-content"
          data-grabbed={isGrabbed || undefined}
          data-dragging={isDragging || undefined}
          style={style}
          className={cn(
            "relative grid max-h-[min(85dvh,calc(100dvh-2rem))] w-full min-w-0 gap-4 overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl bg-popover p-4 pt-14 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-150 outline-none sm:pt-10",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            isGrabbed &&
              "ring-2 ring-primary/50 shadow-md",
            isDragging &&
              "ring-2 ring-primary shadow-xl scale-[1.01]",
            isActiveDrag && "overflow-y-hidden",
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
                "absolute inset-x-0 top-0 z-10 flex touch-none cursor-grab flex-col items-center justify-center gap-1 rounded-t-xl border-b transition-colors duration-150 select-none",
                "h-12 sm:h-8",
                "border-border/30 bg-muted/35 active:cursor-grabbing sm:bg-muted/20",
                isGrabbed &&
                  "cursor-grabbing border-primary/40 bg-primary/10",
                isDragging &&
                  "cursor-grabbing border-primary/60 bg-primary/15"
              )}
              onPointerDown={(event) => {
                event.preventDefault()
                handlePointerDown(event)
              }}
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
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close data-slot="dialog-close" asChild>
              <Button
                variant="ghost"
                className="absolute top-2 right-2 z-20 cursor-default"
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
