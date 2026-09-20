import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { SelectionProps } from "./selection-props";

export function Checkbox({ label, value, checked, disabled, onChange, className }: SelectionProps) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-base", disabled && "cursor-not-allowed text-disabled-text", className)}><input className="peer sr-only" type="checkbox" value={value} checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="flex size-6 items-center justify-center rounded-md border border-border-strong bg-surface text-transparent transition peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-4 peer-focus-visible:ring-focus-ring"><Icon name="check" size={16} /></span><span>{label}</span></label>;
}
