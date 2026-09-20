import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  variant?: "plain" | "soft" | "outlined";
  selected?: boolean;
  iconSize?: 16 | 20 | 24 | 32;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, label, variant = "plain", selected, iconSize = 24, className, ...props }, ref) {
  return <button ref={ref} aria-label={label} aria-pressed={selected} className={cn("cb-control inline-flex size-11 shrink-0 items-center justify-center rounded-full border active:scale-[.96]", variant === "plain" && "border-transparent bg-transparent hover:bg-primary-subtle", variant === "soft" && "border-transparent bg-primary-subtle text-primary hover:bg-primary-soft", variant === "outlined" && "border-border bg-surface hover:border-primary-border hover:bg-primary-subtle", selected && "!border-primary-border !bg-primary-soft !text-primary", className)} {...props}><Icon name={icon} size={iconSize} /></button>;
});
