import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function ReviewCard({ title, description, count, state = "default", icon = "review", ...props }: SemanticCardProps & { title: string; description: string; count: number; icon?: IconName }) {
  return <button className={cn("cb-control cb-card w-full active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-cb-md bg-primary-soft text-primary"><Icon name={state === "locked" ? "lock" : icon} /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-text-strong">{title}</span><span className="block text-sm text-text-muted">{description}</span></span><span className="rounded-full bg-primary-subtle px-2.5 py-1 text-sm font-semibold text-primary">{count}</span></span></button>;
}
