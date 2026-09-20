import { cn } from "../../lib/cn";
import type { SelectionProps } from "./selection-props";

export function Switch({ label, checked, disabled, onChange, className }: Omit<SelectionProps, "value">) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-4", disabled && "cursor-not-allowed text-[#8A96A8]", className)}><span>{label}</span><input className="peer sr-only" type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="relative h-7 w-[52px] rounded-full bg-[#D4DBE6] transition peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-[rgba(10,124,255,.2)] peer-disabled:bg-[#E5EAF2] before:absolute before:left-0.5 before:top-0.5 before:size-6 before:rounded-full before:bg-white before:shadow-sm before:transition-transform peer-checked:before:translate-x-6" /></label>;
}
