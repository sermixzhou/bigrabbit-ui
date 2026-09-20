import { cn } from "../../lib/cn";
import { AudioButton } from "./audio-button";

export function ExampleSentence({ sentence, translation, playing, onAudio, disabled }: { sentence: string; translation: string; playing?: boolean; onAudio?: () => void; disabled?: boolean }) {
  return <div className={cn("rounded-cb border border-border bg-surface p-4", disabled && "bg-disabled-surface text-disabled-text")}><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><p className="font-medium leading-relaxed text-text-strong">{sentence}</p><p className="mt-1 text-sm leading-relaxed text-text-muted">{translation}</p></div><AudioButton size="small" playing={playing} onClick={onAudio} disabled={disabled} /></div></div>;
}
