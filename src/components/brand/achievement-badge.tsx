import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export function AchievementBadge({ label, description, icon = "achievement", variant = "blue", state = "earned", size = "medium", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; description?: string; icon?: IconName; variant?: "blue" | "gold"; state?: "earned" | "progress" | "locked"; size?: "small" | "medium" }) {
  const locked = state === "locked";
  return <button className={cn("cb-focus inline-flex flex-col items-center rounded-cb-sm p-2 text-center", className)} disabled={locked} {...props}><span className={cn("flex items-center justify-center rounded-[18px] border-4 text-on-primary shadow-soft", size === "small" ? "size-12" : "size-16", variant === "blue" ? "border-[#A9CFFF] bg-primary" : "border-[#FDE68A] bg-warning", locked && "border-disabled-border bg-disabled-bg text-disabled-text")}><Icon name={locked ? "lock" : icon} size={size === "small" ? 24 : 32} /></span><span className="mt-2 text-sm font-semibold text-text-strong">{label}</span>{description && <span className="mt-0.5 text-xs text-text-muted">{description}</span>}</button>;
}
