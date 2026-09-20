import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { Semantic } from "../primitives";
import { feedbackMeta } from "./feedback-meta";

export function Toast({ message, variant = "info", actionLabel, onAction, onClose, className }: { message: string; variant?: Semantic; actionLabel?: string; onAction?: () => void; onClose?: () => void; className?: string }) {
  const meta = feedbackMeta[variant];
  return <div role="status" className={cn("flex min-h-12 w-full items-center gap-3 rounded-cb-sm border px-3 py-2 shadow-soft", meta.surface, className)}><Icon name={meta.icon} size={20} className={meta.text} /><p className="min-w-0 flex-1 text-sm font-medium text-brand-deep">{message}</p>{actionLabel && <button className={cn("cb-focus min-h-10 rounded-lg px-2 text-sm font-semibold", meta.text)} onClick={onAction}>{actionLabel}</button>}{onClose && <button className="cb-focus flex size-10 items-center justify-center rounded-full text-[#8A96A8]" aria-label="关闭" onClick={onClose}><Icon name="close" size={20} /></button>}</div>;
}
