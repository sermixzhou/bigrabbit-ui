import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export function CollocationItem({ phrase, translation, selected, onClick }: { phrase: string; translation?: string; selected?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} aria-pressed={selected} className={cn("cb-control flex min-h-11 w-full items-center justify-between gap-3 rounded-cb-sm border border-border bg-surface px-3 text-left", selected && "border-primary bg-primary-subtle")}><span><span className="font-medium text-text-strong">{phrase}</span>{translation && <span className="ml-2 text-sm text-text-muted">{translation}</span>}</span>{selected && <Icon name="check" size={20} className="text-primary" />}</button>;
}
