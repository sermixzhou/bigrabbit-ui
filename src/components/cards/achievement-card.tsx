import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function AchievementCard({ title, description, state = "default", icon = "achievement", ...props }: SemanticCardProps & { title: string; description: string; icon?: IconName }) {
  return <button className={cn("cb-control cb-card w-full text-center active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className={cn("mx-auto flex size-14 items-center justify-center rounded-full bg-[#FFF8E6] text-warning", state === "locked" && "bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={state === "locked" ? "lock" : icon} size={32} /></span><span className="mt-3 block font-semibold text-brand-deep">{title}</span><span className="mt-1 block text-sm text-muted">{description}</span></button>;
}
