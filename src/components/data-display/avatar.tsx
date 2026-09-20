import { useState, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "rounded";
  status?: "online" | "away" | "busy" | "offline";
}

const sizes = { small: "size-8 text-xs", medium: "size-11 text-sm", large: "size-16 text-lg" };
const statusSizes = { small: "size-2.5", medium: "size-3", large: "size-4" };

export function Avatar({ src, alt = "", initials, size = "medium", shape = "circle", status, className, ...props }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const label = alt || initials;
  return <span {...props} role={label ? "img" : undefined} aria-label={label || undefined} className={cn("relative inline-flex shrink-0", className)}><span className={cn("inline-flex items-center justify-center overflow-hidden border border-primary-border bg-primary-soft font-semibold uppercase text-primary", sizes[size], shape === "circle" ? "rounded-full" : "rounded-cb-sm")}>{src && !failed ? <img src={src} alt="" className="size-full object-cover" onError={() => setFailed(true)} /> : initials ? <span aria-hidden="true">{initials.slice(0, 2)}</span> : <span aria-hidden="true" className="text-base">●</span>}</span>{status && <span aria-label={status} className={cn("absolute bottom-0 right-0 rounded-full border-2 border-surface", statusSizes[size], status === "online" && "bg-success", status === "away" && "bg-warning", status === "busy" && "bg-danger", status === "offline" && "bg-disabled-text")} />}</span>;
}
