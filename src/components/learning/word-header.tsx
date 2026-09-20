import { cn } from "../../lib/cn";
import { IconButton } from "../primitives";
import { AudioButton } from "./audio-button";

export function WordHeader({ word, phonetic, meaning, playing, favorite, onAudio, onFavorite, disabled }: { word: string; phonetic: string; meaning: string; playing?: boolean; favorite?: boolean; onAudio?: () => void; onFavorite?: () => void; disabled?: boolean }) {
  return <section className={cn("rounded-cb border border-line bg-white p-5", disabled && "bg-[#F5F7FA] text-[#8A96A8]")}><div className="flex items-start justify-between gap-3"><div><h3 className="break-all font-sans text-4xl font-bold leading-tight text-brand-deep">{word}</h3><p className="mt-1 text-[15px] text-muted">{phonetic}</p></div><IconButton icon="favorite" label={favorite ? "取消收藏" : "收藏"} selected={favorite} disabled={disabled} onClick={onFavorite} /></div><div className="mt-5 flex items-center justify-between gap-3"><p className="text-[17px]">{meaning}</p><AudioButton playing={playing} disabled={disabled} onClick={onAudio} /></div></section>;
}
