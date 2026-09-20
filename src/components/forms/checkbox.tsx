import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { SelectionProps } from "./selection-props";

export function Checkbox({ label, value, checked, disabled, onChange, className }: SelectionProps) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-base", disabled && "cursor-not-allowed text-[#8A96A8]", className)}><input className="peer sr-only" type="checkbox" value={value} checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="flex size-6 items-center justify-center rounded-md border border-[#D4DBE6] bg-white text-transparent transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-[rgba(10,124,255,.2)]"><Icon name="check" size={16} /></span><span>{label}</span></label>;
}
