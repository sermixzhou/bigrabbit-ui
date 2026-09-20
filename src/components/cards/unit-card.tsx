import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { Progress } from "../primitives";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function UnitCard({ unit, title, description, progress, state = "default", icon = "book", ...props }: SemanticCardProps & { unit: string; title: string; description: string; progress: number; icon?: IconName }) {
  const disabled = state === "locked" || state === "disabled";
  return <button className={cn("cb-control cb-card block w-full active:scale-[.99]", cardState(state))} disabled={disabled} {...props}><span className="flex w-full items-center gap-3"><span className={cn("flex size-12 shrink-0 items-center justify-center rounded-cb-md bg-[#E6F1FF] text-brand", disabled && "bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={state === "locked" ? "lock" : icon} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-brand">{unit}</span><span className="block text-[17px] font-semibold text-brand-deep">{title}</span><span className="mt-0.5 block text-sm text-muted">{description}</span></span><span className={cn("flex shrink-0 flex-col items-center gap-1 text-xs font-semibold text-brand", state === "completed" && "text-success", disabled && "text-[#8A96A8]")}><Icon name={state === "completed" ? "check" : state === "locked" ? "lock" : "arrow-right"} size={20} />{state === "completed" ? "完成" : state === "current" ? "继续" : state === "locked" ? "锁定" : "开始"}</span></span><Progress className="mt-4" value={progress} state={state === "completed" ? "success" : "default"} showValue /></button>;
}
