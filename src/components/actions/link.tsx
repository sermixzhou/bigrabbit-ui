import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "inline" | "standalone" | "subtle";
  externalIndicator?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export function Link({ variant = "inline", externalIndicator = false, disabled = false, icon, className, children, onClick, href, ...props }: LinkProps) {
  return <a {...props} href={disabled ? undefined : href} aria-disabled={disabled || undefined} onClick={(event) => { if (disabled) event.preventDefault(); onClick?.(event); }} className={cn("cb-focus rounded-sm font-medium", variant === "inline" && "text-primary underline decoration-primary-border underline-offset-2 hover:decoration-primary", variant === "standalone" && "inline-flex min-h-11 items-center gap-2 text-primary hover:text-primary-hover", variant === "subtle" && "text-text-muted hover:text-text-strong", disabled && "pointer-events-none text-disabled-text no-underline", className)}>{icon}{children}{externalIndicator && <span aria-hidden="true">↗</span>}</a>;
}
