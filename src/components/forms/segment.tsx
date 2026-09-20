import { cn } from "../../lib/cn";

export interface SegmentItem { label: string; value: string; disabled?: boolean; }

export function Segment({ items, value, onChange, disabled, className }: { items: SegmentItem[]; value: string; onChange?: (value: string) => void; disabled?: boolean; className?: string }) {
  return <div className={cn("grid min-h-11 w-full grid-flow-col auto-cols-fr rounded-cb-sm bg-surface-muted p-1", className)} role="radiogroup">{items.map((item) => <button key={item.value} role="radio" aria-checked={value === item.value} disabled={disabled || item.disabled} onClick={() => onChange?.(item.value)} className={cn("cb-focus rounded-[9px] px-3 py-2 text-sm font-medium text-text-muted transition", value === item.value && "bg-surface text-primary shadow-soft", "disabled:text-disabled-text")}>{item.label}</button>)}</div>;
}
