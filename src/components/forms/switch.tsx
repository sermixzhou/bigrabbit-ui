import { cn } from "../../lib/cn";
import type { SelectionProps } from "./selection-props";

export function Switch({ label, checked, disabled, onChange, className }: Omit<SelectionProps, "value">) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-4", disabled && "cursor-not-allowed text-disabled-text", className)}><span>{label}</span><input className="peer sr-only" type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="relative h-7 w-[52px] rounded-full bg-border-strong transition peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-focus-ring peer-disabled:bg-disabled-bg before:absolute before:left-0.5 before:top-0.5 before:size-6 before:rounded-full before:bg-surface before:shadow-sm before:transition-transform peer-checked:before:translate-x-6" /></label>;
}
