import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export function CollocationItem({ phrase, translation, selected, onClick }: { phrase: string; translation?: string; selected?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} aria-pressed={selected} className={cn("cb-control flex min-h-11 w-full items-center justify-between gap-3 rounded-cb-sm border border-line bg-white px-3 text-left", selected && "border-brand bg-[#F2F7FF]")}><span><span className="font-medium text-brand-deep">{phrase}</span>{translation && <span className="ml-2 text-sm text-muted">{translation}</span>}</span>{selected && <Icon name="check" size={20} className="text-brand" />}</button>;
}
