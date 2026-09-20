import { useId, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "./Icon";
import { Button, type Semantic } from "./primitives";
import { Mascot, type MascotState } from "./brand";

const feedbackMeta: Record<Semantic, { icon: IconName; surface: string; text: string }> = {
  neutral: { icon: "info", surface: "border-line bg-white", text: "text-muted" },
  info: { icon: "info", surface: "border-[#CFE4FF] bg-[#F2F7FF]", text: "text-brand" },
  success: { icon: "check", surface: "border-[#BBF7D0] bg-[#ECFDF3]", text: "text-success" },
  warning: { icon: "warning", surface: "border-[#FDE7AA] bg-[#FFF8E6]", text: "text-[#B86900]" },
  error: { icon: "error", surface: "border-[#FFD0CC] bg-[#FFF1F0]", text: "text-danger" },
};

export function Toast({ message, variant = "info", actionLabel, onAction, onClose, className }: { message: string; variant?: Semantic; actionLabel?: string; onAction?: () => void; onClose?: () => void; className?: string }) {
  const meta = feedbackMeta[variant];
  return <div role="status" className={cn("flex min-h-12 w-full items-center gap-3 rounded-br-sm border px-3 py-2 shadow-soft", meta.surface, className)}><Icon name={meta.icon} size={20} className={meta.text} /><p className="min-w-0 flex-1 text-sm font-medium text-brand-deep">{message}</p>{actionLabel && <button className={cn("br-focus min-h-10 rounded-lg px-2 text-sm font-semibold", meta.text)} onClick={onAction}>{actionLabel}</button>}{onClose && <button className="br-focus flex size-10 items-center justify-center rounded-full text-[#8A96A8]" aria-label="关闭" onClick={onClose}><Icon name="close" size={20} /></button>}</div>;
}

export function Modal({ open, title, description, confirmLabel = "确定", cancelLabel = "取消", variant = "default", loading, inline, onConfirm, onCancel, onClose }: { open: boolean; title: string; description?: string; confirmLabel?: string; cancelLabel?: string; variant?: "default" | "destructive"; loading?: boolean; inline?: boolean; onConfirm?: () => void; onCancel?: () => void; onClose?: () => void }) {
  const titleId = useId();
  if (!open) return null;
  return <div className={cn("flex items-center justify-center bg-[#0F2749]/50 p-5", inline ? "relative min-h-[340px] rounded-br" : "fixed inset-0 z-50")} onMouseDown={(event) => event.currentTarget === event.target && onClose?.()}><section role="dialog" aria-modal={!inline} aria-labelledby={titleId} className="w-full max-w-sm animate-rise rounded-br bg-white p-5 text-center shadow-floating"><span className={cn("mx-auto flex size-12 items-center justify-center rounded-full", variant === "destructive" ? "bg-[#FFF8E6] text-warning" : "bg-[#F2F7FF] text-brand")}><Icon name={variant === "destructive" ? "warning" : "info"} /></span><h2 id={titleId} className="mt-4 text-xl font-bold text-brand-deep">{title}</h2>{description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}<div className="mt-5 grid grid-cols-2 gap-3"><Button variant="secondary" size="medium" onClick={onCancel}>{cancelLabel}</Button><Button size="medium" loading={loading} onClick={onConfirm} className={variant === "destructive" ? "bg-danger hover:bg-[#D92D20] active:bg-[#B42318]" : undefined}>{confirmLabel}</Button></div></section></div>;
}

export interface SheetOption { label: string; value: string; icon?: IconName; disabled?: boolean; description?: string; }

export function BottomSheet({ open, title, options, cancelLabel = "取消", inline, onSelect, onCancel, onClose }: { open: boolean; title: string; options: SheetOption[]; cancelLabel?: string; inline?: boolean; onSelect?: (value: string) => void; onCancel?: () => void; onClose?: () => void }) {
  const titleId = useId();
  if (!open) return null;
  return <div className={cn("flex items-end justify-center bg-[#0F2749]/50", inline ? "relative min-h-[390px] overflow-hidden rounded-br" : "fixed inset-0 z-50")} onMouseDown={(event) => event.currentTarget === event.target && onClose?.()}><section role="dialog" aria-modal={!inline} aria-labelledby={titleId} className={cn("w-full animate-rise rounded-t-[24px] bg-white p-4 shadow-floating", inline ? "max-w-lg" : "max-w-2xl")}><span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-[#D4DBE6]" /><h2 id={titleId} className="mb-3 text-center text-lg font-semibold text-brand-deep">{title}</h2><div className="overflow-hidden rounded-br-sm border border-line">{options.map((option) => <button key={option.value} disabled={option.disabled} onClick={() => onSelect?.(option.value)} className="br-control flex min-h-14 w-full items-center gap-3 border-b border-line px-4 text-left last:border-0 hover:bg-[#F2F7FF]">{option.icon && <Icon name={option.icon} className="text-brand" />}<span className="flex-1"><span className="block font-medium">{option.label}</span>{option.description && <span className="block text-xs text-muted">{option.description}</span>}</span><Icon name="arrow-right" size={20} className="text-[#8A96A8]" /></button>)}</div><Button variant="ghost" className="mt-2" onClick={() => { onCancel?.(); onClose?.(); }}>{cancelLabel}</Button></section></div>;
}

export function Skeleton({ variant = "card", rows = 3, animated = true }: { variant?: "text" | "list" | "card"; rows?: number; animated?: boolean }) {
  return <div aria-label="内容加载中" className={cn("w-full", variant === "card" && "br-card")}><div className="flex items-center gap-3">{variant !== "text" && <span className={cn("size-12 rounded-br-md bg-[#E5EAF2]", animated && "animate-pulse")} />}<div className="flex-1"><span className={cn("block h-3 w-2/3 rounded-full bg-[#E5EAF2]", animated && "animate-pulse")} /><span className={cn("mt-2 block h-3 w-1/2 rounded-full bg-[#E5EAF2]", animated && "animate-pulse")} /></div></div><div className="mt-4 space-y-3">{Array.from({ length: rows }).map((_, index) => <span key={index} className={cn("block h-3 rounded-full bg-[#E5EAF2]", index === rows - 1 ? "w-3/5" : "w-full", animated && "animate-pulse")} />)}</div></div>;
}

export function Loading({ label = "加载中", size = "medium", fullScreen = false }: { label?: string; size?: "small" | "medium" | "large"; fullScreen?: boolean }) {
  return <div role="status" className={cn("flex items-center justify-center gap-3", fullScreen && "fixed inset-0 z-50 bg-white/90")}><span className={cn("animate-spin rounded-full border-[3px] border-[#CFE4FF] border-t-brand", size === "small" && "size-5", size === "medium" && "size-8", size === "large" && "size-12")} /><span className="text-sm font-medium text-muted">{label}</span></div>;
}

interface StatePanelProps { icon?: IconName; mascot?: MascotState; title: string; description: string; actionLabel?: string; secondaryLabel?: string; onAction?: () => void; onSecondary?: () => void; className?: string; children?: ReactNode; }

export function StatePanel({ icon, mascot, title, description, actionLabel, secondaryLabel, onAction, onSecondary, className, children }: StatePanelProps) {
  return <section className={cn("flex w-full flex-col items-center rounded-br border border-line bg-white p-5 text-center", className)}>{mascot ? <Mascot state={mascot} size="large" /> : <span className="flex size-20 items-center justify-center rounded-full bg-[#F2F7FF] text-brand"><Icon name={icon ?? "info"} size={32} /></span>}<h3 className="mt-4 text-xl font-bold text-brand-deep">{title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{description}</p>{children}{actionLabel && <Button className="mt-5 max-w-xs" onClick={onAction}>{actionLabel}</Button>}{secondaryLabel && <Button variant="ghost" size="medium" className="mt-1 max-w-xs" onClick={onSecondary}>{secondaryLabel}</Button>}</section>;
}

export const EmptyState = (props: Omit<StatePanelProps, "mascot">) => <StatePanel mascot="empty" {...props} />;
export const ErrorState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="error" {...props} />;
export const PermissionState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="microphone" {...props} />;
export const LockedState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="lock" {...props} />;

export function OnboardingHint({ step, total, title, description, actionLabel = "下一步", skipLabel = "跳过", onNext, onSkip }: { step: number; total: number; title: string; description: string; actionLabel?: string; skipLabel?: string; onNext?: () => void; onSkip?: () => void }) {
  return <section className="rounded-br border border-[#CFE4FF] bg-white p-4 shadow-floating"><div className="flex items-center justify-between"><span className="br-eyebrow">{step} / {total}</span><button onClick={onSkip} className="br-focus min-h-11 rounded-lg px-2 text-sm text-muted">{skipLabel}</button></div><h3 className="text-lg font-semibold text-brand-deep">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{description}</p><Button size="medium" className="mt-4" onClick={onNext}>{actionLabel}</Button></section>;
}
