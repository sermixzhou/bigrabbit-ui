import { cn } from "../../lib/cn";
import type { SegmentItem } from "./segment";

export function Tabs({ items, value, onChange, variant = "line", disabled, className }: { items: SegmentItem[]; value: string; onChange?: (value: string) => void; variant?: "line" | "pill"; disabled?: boolean; className?: string }) {
  return <div className={cn("flex min-h-11 w-full items-stretch gap-1", variant === "pill" && "rounded-cb-sm bg-surface-muted p-1", className)} role="tablist">{items.map((item) => <button key={item.value} role="tab" aria-selected={value === item.value} disabled={disabled || item.disabled} onClick={() => onChange?.(item.value)} className={cn("cb-focus relative min-h-11 flex-1 px-3 text-sm font-medium text-text-muted transition", variant === "pill" ? "rounded-[9px]" : "border-b-2 border-transparent", value === item.value && (variant === "pill" ? "bg-surface text-primary shadow-soft" : "border-primary text-primary"))}>{item.label}</button>)}</div>;
}
