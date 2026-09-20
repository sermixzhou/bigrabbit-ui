import { cn } from "../../lib/cn";
import { IconButton } from "../primitives";
import { AudioButton } from "./audio-button";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export function WordHeader({ word, phonetic, meaning, playing, favorite, favoriteLabel, unfavoriteLabel, audioLabel, playingLabel, onAudio, onFavorite, disabled }: { word: string; phonetic: string; meaning: string; playing?: boolean; favorite?: boolean; favoriteLabel?: string; unfavoriteLabel?: string; audioLabel?: string; playingLabel?: string; onAudio?: () => void; onFavorite?: () => void; disabled?: boolean }) {
  const messages = useChattyBunnyMessages();
  return <section className={cn("rounded-cb border border-border bg-surface p-5", disabled && "bg-disabled-surface text-disabled-text")}><div className="flex items-start justify-between gap-3"><div><h3 className="break-all font-sans text-4xl font-bold leading-tight text-text-strong">{word}</h3><p className="mt-1 text-[15px] text-text-muted">{phonetic}</p></div><IconButton icon="favorite" label={favorite ? unfavoriteLabel ?? messages.unfavorite : favoriteLabel ?? messages.favorite} selected={favorite} disabled={disabled} onClick={onFavorite} /></div><div className="mt-5 flex items-center justify-between gap-3"><p className="text-[17px]">{meaning}</p><AudioButton label={audioLabel} playingLabel={playingLabel} playing={playing} disabled={disabled} onClick={onAudio} /></div></section>;
}
