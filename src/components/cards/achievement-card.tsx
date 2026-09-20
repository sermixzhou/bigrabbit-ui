import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function AchievementCard({ title, description, state = "default", icon = "achievement", ...props }: SemanticCardProps & { title: string; description: string; icon?: IconName }) {
  return <button className={cn("cb-control cb-card w-full text-center active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className={cn("mx-auto flex size-14 items-center justify-center rounded-full bg-warning-soft text-warning", state === "locked" && "bg-disabled-bg text-disabled-text")}><Icon name={state === "locked" ? "lock" : icon} size={32} /></span><span className="mt-3 block font-semibold text-text-strong">{title}</span><span className="mt-1 block text-sm text-text-muted">{description}</span></button>;
}
