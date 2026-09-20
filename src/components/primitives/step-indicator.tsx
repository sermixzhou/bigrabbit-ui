import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface StepItem { label: string; value?: string; }

export function StepIndicator({ items, current = 0, className }: { items: StepItem[]; current?: number; className?: string }) {
  return <ol className={cn("flex w-full", className)} aria-label="步骤进度">{items.map((item, index) => { const done = index < current; const active = index === current; return <li key={item.value ?? item.label} className="relative flex flex-1 flex-col items-center text-center last:flex-none">{index < items.length - 1 && <span className={cn("absolute left-1/2 right-[-50%] top-3 h-px", index < current ? "bg-brand" : "bg-[#D4DBE6]")} />}<span className={cn("relative z-10 flex size-6 items-center justify-center rounded-full border text-xs font-semibold", done && "border-brand bg-brand text-white", active && "border-brand bg-[#E6F1FF] text-brand", !done && !active && "border-[#D4DBE6] bg-white text-[#8A96A8]")}>{done ? <Icon name="check" size={16} /> : index + 1}</span><span className={cn("mt-2 max-w-16 text-xs", active || done ? "font-semibold text-brand-deep" : "text-[#8A96A8]")}>{item.label}</span></li>; })}</ol>;
}
