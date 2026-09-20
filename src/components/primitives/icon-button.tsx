import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  variant?: "plain" | "soft" | "outlined";
  selected?: boolean;
  iconSize?: 16 | 20 | 24 | 32;
}

export function IconButton({ icon, label, variant = "plain", selected, iconSize = 24, className, ...props }: IconButtonProps) {
  return <button aria-label={label} aria-pressed={selected} className={cn("cb-control inline-flex size-11 shrink-0 items-center justify-center rounded-full border active:scale-[.96]", variant === "plain" && "border-transparent bg-transparent hover:bg-[#F2F7FF]", variant === "soft" && "border-transparent bg-[#F2F7FF] text-brand hover:bg-[#E6F1FF]", variant === "outlined" && "border-line bg-white hover:border-[#CFE4FF] hover:bg-[#F2F7FF]", selected && "!border-[#CFE4FF] !bg-[#E6F1FF] !text-brand", className)} {...props}><Icon name={icon} size={iconSize} /></button>;
}
