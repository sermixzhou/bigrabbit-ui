import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { cardState, type SemanticCardProps } from "./semantic-card";

export function WordCard({ word, phonetic, meaning, state = "default", favorite, ...props }: SemanticCardProps & { word: string; phonetic: string; meaning: string; favorite?: boolean }) {
  return <button className={cn("cb-control cb-card w-full active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className="flex items-start justify-between gap-3"><span className="min-w-0"><span className="block text-2xl font-bold text-text-strong">{word}</span><span className="mt-1 block text-sm text-text-muted">{phonetic}</span><span className="mt-3 block text-base">{meaning}</span></span><Icon name={state === "locked" ? "lock" : favorite ? "favorite" : "arrow-right"} className={favorite ? "text-primary" : "text-text-subtle"} /></span></button>;
}
