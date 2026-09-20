import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface TimelineItem {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  icon?: IconName | ReactNode;
  state?: "default" | "current" | "completed" | "warning" | "error";
}

export interface TimelineProps { items: TimelineItem[]; className?: string; }

export function Timeline({ items, className }: TimelineProps) {
  return <ol className={cn("space-y-0", className)}>{items.map((item, index) => { const state = item.state ?? "default"; return <li key={index} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-3 pb-6 last:pb-0">{index < items.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-8 w-px bg-border-strong" />}<span className={cn("relative z-10 flex size-8 items-center justify-center rounded-full border bg-surface text-text-subtle", state === "current" && "border-primary bg-primary text-on-primary", state === "completed" && "border-success bg-success text-on-primary", state === "warning" && "border-warning bg-warning-soft text-warning", state === "error" && "border-danger bg-danger-soft text-danger")}>{typeof item.icon === "string" ? <Icon name={item.icon as IconName} size={16} /> : item.icon ?? (state === "completed" ? <Icon name="check" size={16} /> : <span className="size-2 rounded-full bg-current" />)}</span><div className="min-w-0 pt-1"><div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"><strong className="text-sm text-text-strong">{item.title}</strong>{item.timestamp && <time className="text-xs text-text-subtle">{item.timestamp}</time>}</div>{item.description && <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.description}</p>}</div></li>; })}</ol>;
}
