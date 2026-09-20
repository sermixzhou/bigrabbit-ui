import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { Progress } from "../primitives";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function LearningProgressCard({ title, subtitle, value, max = 100, icon = "book", state = "default", ...props }: SemanticCardProps & { title: string; subtitle: string; value: number; max?: number; icon?: IconName }) {
  return <button className={cn("cb-control cb-card w-full active:scale-[.99]", cardState(state))} disabled={state === "disabled"} {...props}><div className="flex items-center gap-3"><span className="flex size-12 shrink-0 items-center justify-center rounded-cb-md bg-[#E6F1FF] text-brand"><Icon name={state === "completed" ? "check" : icon} /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-brand-deep">{title}</span><span className="mt-0.5 block text-sm text-muted">{subtitle}</span></span><Icon name="arrow-right" size={20} className="text-[#8A96A8]" /></div><Progress className="mt-4" value={value} max={max} state={state === "completed" ? "success" : "default"} showValue /></button>;
}
