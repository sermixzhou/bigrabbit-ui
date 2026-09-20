import { cn } from "../../lib/cn";

export interface SegmentItem { label: string; value: string; disabled?: boolean; }

export function Segment({ items, value, onChange, disabled, className }: { items: SegmentItem[]; value: string; onChange?: (value: string) => void; disabled?: boolean; className?: string }) {
  return <div className={cn("grid min-h-11 w-full grid-flow-col auto-cols-fr rounded-cb-sm bg-[#F5F7FA] p-1", className)} role="radiogroup">{items.map((item) => <button key={item.value} role="radio" aria-checked={value === item.value} disabled={disabled || item.disabled} onClick={() => onChange?.(item.value)} className={cn("cb-focus rounded-[9px] px-3 py-2 text-sm font-medium text-muted transition", value === item.value && "bg-white text-brand shadow-soft", "disabled:text-[#8A96A8]")}>{item.label}</button>)}</div>;
}
