import { useId } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { Button } from "../primitives";

export function Modal({ open, title, description, confirmLabel, cancelLabel, variant = "default", loading, inline, onConfirm, onCancel, onClose }: { open: boolean; title: string; description?: string; confirmLabel?: string; cancelLabel?: string; variant?: "default" | "destructive"; loading?: boolean; inline?: boolean; onConfirm?: () => void; onCancel?: () => void; onClose?: () => void }) {
  const messages = useChattyBunnyMessages();
  const titleId = useId();
  if (!open) return null;
  return <div className={cn("flex items-center justify-center bg-overlay p-5", inline ? "relative min-h-[340px] rounded-cb" : "fixed inset-0 z-50")} onMouseDown={(event) => event.currentTarget === event.target && onClose?.()}><section role="dialog" aria-modal={!inline} aria-labelledby={titleId} className="w-full max-w-sm animate-rise rounded-cb bg-surface p-5 text-center shadow-floating"><span className={cn("mx-auto flex size-12 items-center justify-center rounded-full", variant === "destructive" ? "bg-warning-soft text-warning" : "bg-primary-subtle text-primary")}><Icon name={variant === "destructive" ? "warning" : "info"} /></span><h2 id={titleId} className="mt-4 text-xl font-bold text-text-strong">{title}</h2>{description && <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>}<div className="mt-5 grid grid-cols-2 gap-3"><Button variant="secondary" size="medium" onClick={onCancel}>{cancelLabel ?? messages.cancel}</Button><Button size="medium" loading={loading} onClick={onConfirm} className={variant === "destructive" ? "bg-danger hover:bg-danger-hover active:bg-danger-pressed" : undefined}>{confirmLabel ?? messages.confirm}</Button></div></section></div>;
}
