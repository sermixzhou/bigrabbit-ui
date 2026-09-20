import { useId, useRef } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { Icon } from "../icon";
import { Button } from "../primitives";
import { FloatingFocusManager, FloatingOverlay, OverlayPortal, useOverlayFoundation } from "./overlay-foundation";

export interface AlertDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function AlertDialog({ open, title, description, confirmLabel, cancelLabel, loading = false, destructive = true, onConfirm, onCancel, onOpenChange, className }: AlertDialogProps) {
  const messages = useChattyBunnyMessages();
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const foundation = useOverlayFoundation({ open, onOpenChange, role: "alertdialog", outsidePress: false });
  if (!open) return null;
  const cancel = () => { onCancel?.(); onOpenChange(false); };
  return <OverlayPortal><FloatingOverlay lockScroll className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-5"><FloatingFocusManager context={foundation.context} modal initialFocus={cancelRef} returnFocus><section ref={foundation.refs.setFloating} {...foundation.getFloatingProps()} role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId} className={cn("w-full max-w-sm rounded-cb border border-border bg-surface p-5 text-center shadow-floating", className)}><span className={cn("mx-auto flex size-12 items-center justify-center rounded-full", destructive ? "bg-danger-soft text-danger" : "bg-warning-soft text-warning")}><Icon name={destructive ? "error" : "warning"} /></span><h2 id={titleId} className="mt-4 text-xl font-bold text-text-strong">{title}</h2><p id={descriptionId} className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p><div className="mt-5 grid grid-cols-2 gap-3"><Button ref={cancelRef} variant="secondary" size="medium" disabled={loading} onClick={cancel}>{cancelLabel ?? messages.cancel}</Button><Button size="medium" loading={loading} onClick={onConfirm} className={destructive ? "bg-danger hover:bg-danger-hover active:bg-danger-pressed" : undefined}>{confirmLabel ?? messages.confirm}</Button></div></section></FloatingFocusManager></FloatingOverlay></OverlayPortal>;
}
