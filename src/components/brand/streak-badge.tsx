import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export function StreakBadge({ days, label = "连续学习", state = "active", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { days: number; label?: string; state?: "default" | "active" | "completed" }) {
  return <button className={cn("cb-control inline-flex min-h-11 items-center gap-2 rounded-cb-md border border-[#FDE7AA] bg-[#FFF8E6] px-3 text-left", state === "completed" && "border-[#BBF7D0] bg-[#ECFDF3]", className)} {...props}><Icon name={state === "completed" ? "check" : "fire"} className={state === "completed" ? "text-success" : "text-warning"} /><span><strong className="block text-brand-deep">{days} 天</strong><small className="block text-xs text-muted">{label}</small></span></button>;
}
