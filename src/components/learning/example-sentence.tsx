import { cn } from "../../lib/cn";
import { AudioButton } from "./audio-button";

export function ExampleSentence({ sentence, translation, playing, onAudio, disabled }: { sentence: string; translation: string; playing?: boolean; onAudio?: () => void; disabled?: boolean }) {
  return <div className={cn("rounded-cb border border-line bg-white p-4", disabled && "bg-[#F5F7FA] text-[#8A96A8]")}><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><p className="font-medium leading-relaxed text-brand-deep">{sentence}</p><p className="mt-1 text-sm leading-relaxed text-muted">{translation}</p></div><AudioButton size="small" playing={playing} onClick={onAudio} disabled={disabled} /></div></div>;
}
