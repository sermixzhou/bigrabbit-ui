import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface ProfileCardProps extends HTMLAttributes<HTMLElement> {
  avatar?: ReactNode;
  media?: ReactNode;
  name: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  status?: ReactNode;
  tags?: ReactNode;
  actions?: ReactNode;
  orientation?: "default" | "compact";
}

export function ProfileCard({ avatar, media, name, subtitle, description, metadata, status, tags, actions, orientation = "default", className, ...props }: ProfileCardProps) {
  return <article {...props} className={cn("rounded-cb border border-border bg-surface p-5 shadow-soft", orientation === "compact" && "flex items-center gap-4 p-4", className)}>{(avatar || media) && <div className={cn("shrink-0", orientation === "default" && "mb-4")}>{avatar ?? media}</div>}<div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="truncate text-lg font-bold text-text-strong">{name}</h3>{status}</div>{subtitle && <p className="mt-0.5 text-sm font-medium text-text-muted">{subtitle}</p>}{description && <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>}{metadata && <div className="mt-2 text-xs text-text-subtle">{metadata}</div>}{tags && <div className="mt-3 flex flex-wrap gap-2">{tags}</div>}</div>{actions && <div className={cn("shrink-0", orientation === "default" && "mt-4")}>{actions}</div>}</article>;
}
