import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { Progress } from "../primitives";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function UnitCard({ unit, title, description, progress, state = "default", icon = "book", ...props }: SemanticCardProps & { unit: string; title: string; description: string; progress: number; icon?: IconName }) {
  const messages = useChattyBunnyMessages();
  const disabled = state === "locked" || state === "disabled";
  return <button className={cn("cb-control cb-card block w-full active:scale-[.99]", cardState(state))} disabled={disabled} {...props}><span className="flex w-full items-center gap-3"><span className={cn("flex size-12 shrink-0 items-center justify-center rounded-cb-md bg-primary-soft text-primary", disabled && "bg-disabled-bg text-disabled-text")}><Icon name={state === "locked" ? "lock" : icon} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-primary">{unit}</span><span className="block text-[17px] font-semibold text-text-strong">{title}</span><span className="mt-0.5 block text-sm text-text-muted">{description}</span></span><span className={cn("flex shrink-0 flex-col items-center gap-1 text-xs font-semibold text-primary", state === "completed" && "text-success", disabled && "text-disabled-text")}><Icon name={state === "completed" ? "check" : state === "locked" ? "lock" : "arrow-right"} size={20} />{state === "completed" ? messages.completeAction : state === "current" ? messages.continue : state === "locked" ? messages.lockedAction : messages.start}</span></span><Progress className="mt-4" value={progress} state={state === "completed" ? "success" : "default"} showValue /></button>;
}
