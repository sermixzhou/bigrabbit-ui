import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface StepItem { label: string; value?: string; }

export function StepIndicator({ items, current = 0, className }: { items: StepItem[]; current?: number; className?: string }) {
  return <ol className={cn("flex w-full", className)} aria-label="步骤进度">{items.map((item, index) => { const done = index < current; const active = index === current; return <li key={item.value ?? item.label} className="relative flex flex-1 flex-col items-center text-center last:flex-none">{index < items.length - 1 && <span className={cn("absolute left-1/2 right-[-50%] top-3 h-px", index < current ? "bg-primary" : "bg-border-strong")} />}<span className={cn("relative z-10 flex size-6 items-center justify-center rounded-full border text-xs font-semibold", done && "border-primary bg-primary text-on-primary", active && "border-primary bg-primary-soft text-primary", !done && !active && "border-border-strong bg-surface text-text-subtle")}>{done ? <Icon name="check" size={16} /> : index + 1}</span><span className={cn("mt-2 max-w-16 text-xs", active || done ? "font-semibold text-text-strong" : "text-text-subtle")}>{item.label}</span></li>; })}</ol>;
}
