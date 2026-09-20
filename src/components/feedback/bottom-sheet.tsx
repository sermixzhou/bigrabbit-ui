import { useId } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { Button } from "../primitives";

export interface SheetOption { label: string; value: string; icon?: IconName; disabled?: boolean; description?: string; }

export function BottomSheet({ open, title, options, cancelLabel = "取消", inline, onSelect, onCancel, onClose }: { open: boolean; title: string; options: SheetOption[]; cancelLabel?: string; inline?: boolean; onSelect?: (value: string) => void; onCancel?: () => void; onClose?: () => void }) {
  const titleId = useId();
  if (!open) return null;
  return <div className={cn("flex items-end justify-center bg-overlay", inline ? "relative min-h-[390px] overflow-hidden rounded-cb" : "fixed inset-0 z-50")} onMouseDown={(event) => event.currentTarget === event.target && onClose?.()}><section role="dialog" aria-modal={!inline} aria-labelledby={titleId} className={cn("w-full animate-rise rounded-t-[24px] bg-surface p-4 shadow-floating", inline ? "max-w-lg" : "max-w-2xl")}><span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-border-strong" /><h2 id={titleId} className="mb-3 text-center text-lg font-semibold text-text-strong">{title}</h2><div className="overflow-hidden rounded-cb-sm border border-border">{options.map((option) => <button key={option.value} disabled={option.disabled} onClick={() => onSelect?.(option.value)} className="cb-control flex min-h-14 w-full items-center gap-3 border-b border-border px-4 text-left last:border-0 hover:bg-primary-subtle">{option.icon && <Icon name={option.icon} className="text-primary" />}<span className="flex-1"><span className="block font-medium">{option.label}</span>{option.description && <span className="block text-xs text-text-muted">{option.description}</span>}</span><Icon name="arrow-right" size={20} className="text-text-subtle" /></button>)}</div><Button variant="ghost" className="mt-2" onClick={() => { onCancel?.(); onClose?.(); }}>{cancelLabel}</Button></section></div>;
}
