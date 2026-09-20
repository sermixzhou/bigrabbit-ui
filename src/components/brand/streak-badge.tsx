import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export function StreakBadge({ days, label, state = "active", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { days: number; label?: string; state?: "default" | "active" | "completed" }) {
  const messages = useChattyBunnyMessages();
  return <button className={cn("cb-control inline-flex min-h-11 items-center gap-2 rounded-cb-md border border-warning-border bg-warning-soft px-3 text-left", state === "completed" && "border-success-border bg-success-soft", className)} {...props}><Icon name={state === "completed" ? "check" : "fire"} className={state === "completed" ? "text-success" : "text-warning"} /><span><strong className="block text-text-strong">{messages.days(days)}</strong><small className="block text-xs text-text-muted">{label ?? messages.streak}</small></span></button>;
}
