import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "large" | "medium";
  loading?: boolean;
  icon?: IconName;
  block?: boolean;
}

export function Button({ variant = "primary", size = "large", loading = false, icon, block = true, className, children, disabled, ...props }: ButtonProps) {
  return <button className={cn("cb-control inline-flex items-center justify-center gap-2 rounded-cb-md border px-5 text-[17px] font-semibold active:scale-[.98]", size === "large" ? "h-12" : "h-11", variant === "primary" && "border-transparent bg-brand text-white hover:bg-brand-hover active:bg-brand-pressed", variant === "secondary" && "border-[#CFE4FF] bg-[#F2F7FF] text-brand hover:bg-[#E6F1FF]", variant === "ghost" && "border-transparent bg-transparent text-brand hover:bg-[#E6F1FF]", block ? "w-full" : "w-auto", className)} disabled={disabled || loading} {...props}>{loading ? <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" /> : icon ? <Icon name={icon} size={20} /> : null}<span>{loading ? "加载中" : children}</span></button>;
}
