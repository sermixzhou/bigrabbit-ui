import { cn } from "../../lib/cn";
import type { SelectionProps } from "./selection-props";

export function Radio({ label, value, checked, disabled, onChange, className }: SelectionProps) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-base", disabled && "cursor-not-allowed text-disabled-text", className)}><input className="peer sr-only" type="radio" value={value} checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="flex size-6 items-center justify-center rounded-full border border-border-strong bg-surface transition peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-focus-ring"><span className="size-2 rounded-full bg-surface" /></span><span>{label}</span></label>;
}
