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

interface DialogStackContextValue {
  register: (id: string) => void
  unregister: (id: string) => void
  stackSize: number
}

const DialogStackContext = React.createContext<DialogStackContextValue | null>(
  null
)

function useDialogStack() {
  const context = React.useContext(DialogStackContext)
  if (!context) {
    throw new Error("useDialogStack must be used within DialogStackProvider")
  }
  return context
}

function DialogStackProvider({ children }: { children: React.ReactNode }) {
  const [openIds, setOpenIds] = React.useState<string[]>([])

  const register = React.useCallback((id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const unregister = React.useCallback((id: string) => {
    setOpenIds((prev) => prev.filter((entry) => entry !== id))
  }, [])

  const value = React.useMemo(
    () => ({
      register,
      unregister,
      stackSize: openIds.length,
    }),
    [register, unregister, openIds.length]
  )

  return (
    <DialogStackContext.Provider value={value}>
      {children}
    </DialogStackContext.Provider>
  )
}

function useDraggableDialog() {
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
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

      const pointerId = event.pointerId
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
          moveEvent.preventDefault()
        }

        setOffset({
          x: drag.originX + deltaX,
          y: drag.originY + deltaY,
        })
      }

      const endDrag = () => {
        const wasDragged = dragRef.current?.active ?? false
        dragRef.current = null
        setIsDragging(false)
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

      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", endDrag)
      window.addEventListener("pointercancel", endDrag)
    },
    []
  )

  return {
    contentRef,
    offset,
    isDragging,
    handlePointerDown,
  }
}

function Dialog({
  modal,
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const id = React.useId()
  const parentLayer = React.useContext(DialogLayerContext)
  const { register, unregister } = useDialogStack()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen ?? false
  )

  const isControlled = open !== undefined
  const isOpen = isControlled ? open : uncontrolledOpen
  const isNested = parentLayer > 0

  React.useEffect(() => {
    if (!isOpen) return
    register(id)
    return () => unregister(id)
  }, [isOpen, id, register, unregister])

  const layer = isOpen ? parentLayer + 1 : parentLayer

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(next)
    }
    onOpenChange?.(next)
  }

  return (
    <DialogLayerContext.Provider value={layer}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={isOpen}
        onOpenChange={handleOpenChange}
        modal={modal ?? !isNested}
        {...props}
      >
        {children}
      </DialogPrimitive.Root>
    </DialogLayerContext.Provider>
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

function DialogContent({
  className,
  children,
  title,
  showCloseButton = true,
  draggable = true,
  style,
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Accessible name for screen readers (rendered visually hidden). */
  title: string
  showCloseButton?: boolean
  /** @default true */
  draggable?: boolean
}) {
  const layer = React.useContext(DialogLayerContext)
  const { stackSize } = useDialogStack()
  const { contentRef, offset, isDragging, handlePointerDown } =
    useDraggableDialog()

  const zIndex = DIALOG_BASE_Z + layer * DIALOG_Z_STEP
  const showOverlay = stackSize === 1

  return (
    <DialogPortal>
      {showOverlay ? (
        <DialogOverlay style={{ zIndex: zIndex - 1 }} />
      ) : null}
      <div
        data-slot="dialog-positioner"
        className={cn(
          "fixed top-1/2 left-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-sm",
          draggable &&
            "cursor-grab data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none"
        )}
        data-dragging={isDragging || undefined}
        style={{
          zIndex,
          left: draggable
            ? `calc(50% + ${offset.x}px)`
            : "50%",
          top: draggable
            ? `calc(50% + ${offset.y}px)`
            : "50%",
          transform: "translate(-50%, -50%)",
        }}
        onPointerDown={draggable ? handlePointerDown : undefined}
      >
        <DialogPrimitive.Content
          ref={contentRef}
          data-slot="dialog-content"
          style={style}
          className={cn(
            "relative grid w-full gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          onInteractOutside={(event) => {
            const target = event.target as HTMLElement
            if (target.closest("[data-slot='dialog-content']")) {
              event.preventDefault()
            }
            onInteractOutside?.(event)
          }}
          {...props}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close data-slot="dialog-close" asChild>
              <Button
                variant="ghost"
                className="absolute top-2 right-2 cursor-default"
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
