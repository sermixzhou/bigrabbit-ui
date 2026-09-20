import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> { leadingIcon?: IconName; title: string; description?: string; trailing?: ReactNode; arrow?: boolean; state?: "default" | "current" | "selected" | "completed" | "locked" | "disabled"; }

export function ListItem({ leadingIcon, title, description, trailing, arrow = true, state = "default", className, ...props }: ListItemProps) {
  const disabled = state === "disabled" || state === "locked";
  return <button className={cn("cb-control flex min-h-14 w-full items-center gap-3 border-b border-border bg-surface px-4 text-left last:border-b-0 hover:bg-surface-soft", (state === "selected" || state === "current") && "bg-primary-subtle", disabled && "bg-disabled-surface text-disabled-text", className)} disabled={disabled} {...props}>{leadingIcon && <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-cb-sm bg-primary-subtle text-primary", disabled && "bg-disabled-bg text-disabled-text")}><Icon name={state === "locked" ? "lock" : state === "completed" ? "check" : leadingIcon} size={20} /></span>}<span className="min-w-0 flex-1"><span className="block truncate font-medium text-text-strong">{title}</span>{description && <span className="block truncate text-sm text-text-muted">{description}</span>}</span>{trailing && <span className="shrink-0 text-sm text-text-muted">{trailing}</span>}{arrow && <Icon name="arrow-right" size={20} className="text-text-subtle" />}</button>;
}
