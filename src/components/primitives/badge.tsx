import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { semanticStyles, type Semantic } from "./semantic";

export function Badge({ children, variant = "info", dot = false, className }: { children?: ReactNode; variant?: Semantic; dot?: boolean; className?: string }) {
  if (dot) return <span aria-label={String(children ?? "状态提示")} className={cn("inline-block size-2.5 rounded-full", variant === "error" ? "bg-danger" : variant === "success" ? "bg-success" : variant === "warning" ? "bg-warning" : "bg-primary", className)} />;
  return <span className={cn("inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold", semanticStyles[variant], className)}>{children}</span>;
}
