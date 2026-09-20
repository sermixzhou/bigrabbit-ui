import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { useToggleGroupContext } from "./toggle-group-context";

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value?: string;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  icon?: IconName;
  size?: "medium" | "small";
  variant?: "soft" | "outlined";
}

export function Toggle({ value, pressed = false, onPressedChange, icon, size = "medium", variant = "soft", disabled, className, children, onClick, tabIndex, ...props }: ToggleProps) {
  const group = useToggleGroupContext();
  const selected = group && value !== undefined ? group.values.includes(value) : pressed;
  return <button {...props} type={props.type ?? "button"} disabled={disabled} data-cb-toggle={group ? "" : undefined} aria-pressed={selected} tabIndex={group ? (group.type === "single" ? selected ? 0 : -1 : tabIndex ?? -1) : tabIndex} onClick={(event) => { onClick?.(event); if (event.defaultPrevented) return; if (group && value !== undefined) group.change(value); else onPressedChange?.(!selected); }} className={cn("cb-control inline-flex min-h-11 items-center justify-center gap-2 rounded-cb-sm border px-3 text-sm font-semibold", size === "small" && "min-h-10 px-2.5 text-xs", variant === "soft" ? "border-transparent bg-primary-subtle text-text-strong hover:bg-primary-soft" : "border-border bg-surface text-text-muted hover:border-primary-border hover:bg-primary-subtle", selected && "!border-primary !bg-primary !text-on-primary", disabled && "cursor-not-allowed border-disabled-border bg-disabled-surface text-disabled-text", className)}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}
