import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export function AchievementBadge({ label, description, icon = "achievement", variant = "blue", state = "earned", size = "medium", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; description?: string; icon?: IconName; variant?: "blue" | "gold"; state?: "earned" | "progress" | "locked"; size?: "small" | "medium" }) {
  const locked = state === "locked";
  return <button className={cn("cb-focus inline-flex flex-col items-center rounded-cb-sm p-2 text-center", className)} disabled={locked} {...props}><span className={cn("flex items-center justify-center rounded-[18px] border-4 text-white shadow-soft", size === "small" ? "size-12" : "size-16", variant === "blue" ? "border-[#A9CFFF] bg-brand" : "border-[#FDE68A] bg-warning", locked && "border-[#D4DBE6] bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={locked ? "lock" : icon} size={size === "small" ? 24 : 32} /></span><span className="mt-2 text-sm font-semibold text-brand-deep">{label}</span>{description && <span className="mt-0.5 text-xs text-muted">{description}</span>}</button>;
}
