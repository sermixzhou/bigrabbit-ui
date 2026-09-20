import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Progress } from "../primitives/progress";

export interface StatCardProps extends HTMLAttributes<HTMLElement> {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  trend?: { value: string; direction?: "up" | "down" | "neutral" };
  supportingText?: ReactNode;
  progress?: number;
  state?: "default" | "success" | "warning" | "danger";
}

export function StatCard({ label, value, icon, trend, supportingText, progress, state = "default", className, ...props }: StatCardProps) {
  return <article {...props} className={cn("cb-card shadow-soft", state === "success" && "border-success-border bg-success-soft", state === "warning" && "border-warning-border bg-warning-soft", state === "danger" && "border-danger-border bg-danger-soft", className)}><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-sm font-medium text-text-muted">{label}</p><div className="mt-1 flex flex-wrap items-baseline gap-2"><strong className="text-3xl font-bold tracking-tight text-text-strong">{value}</strong>{trend && <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", trend.direction === "up" ? "bg-success-soft text-success-text" : trend.direction === "down" ? "bg-danger-soft text-danger" : "bg-surface-muted text-text-muted")}>{trend.direction === "up" ? "↑ " : trend.direction === "down" ? "↓ " : ""}{trend.value}</span>}</div></div>{icon && <span className="flex size-11 shrink-0 items-center justify-center rounded-cb-sm bg-primary-soft text-primary">{icon}</span>}</div>{supportingText && <p className="mt-2 text-sm leading-relaxed text-text-muted">{supportingText}</p>}{progress !== undefined && <Progress value={progress} size="slim" className="mt-4" />}</article>;
}
