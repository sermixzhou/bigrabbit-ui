import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "default" | "soft";
  padding?: "standard" | "large";
  shadow?: "none" | "soft" | "floating";
  state?: "default" | "selected" | "disabled";
  footer?: ReactNode;
}

export function Card({ title, description, variant = "default", padding = "standard", shadow = "none", state = "default", footer, className, children, ...props }: CardProps) {
  return <div className={cn("rounded-cb border bg-white text-left transition", padding === "large" ? "p-5" : "p-4", variant === "soft" && "border-[#CFE4FF] bg-[#F2F7FF]", state === "default" && variant === "default" && "border-line", state === "selected" && "!border-brand !bg-[#F2F7FF]", state === "disabled" && "!border-[#D4DBE6] !bg-[#F5F7FA] !text-[#8A96A8]", shadow === "soft" && "shadow-soft", shadow === "floating" && "shadow-floating", className)} {...props}>{title && <h3 className="text-[17px] font-semibold leading-[1.4] text-brand-deep">{title}</h3>}{description && <p className="mt-1 text-sm leading-[1.45] text-muted">{description}</p>}{children && <div className={cn((title || description) && "mt-4")}>{children}</div>}{footer && <div className="mt-4">{footer}</div>}</div>;
}
