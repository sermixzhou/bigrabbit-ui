import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import achievementUrl from "../assets/icons/achievement.svg";
import arrowLeftUrl from "../assets/icons/arrow-left.svg";
import arrowRightUrl from "../assets/icons/arrow-right.svg";
import audioUrl from "../assets/icons/audio.svg";
import backUrl from "../assets/icons/back.svg";
import bookUrl from "../assets/icons/book.svg";
import calendarUrl from "../assets/icons/calendar.svg";
import checkUrl from "../assets/icons/check.svg";
import closeUrl from "../assets/icons/close.svg";
import errorUrl from "../assets/icons/error.svg";
import favoriteUrl from "../assets/icons/favorite.svg";
import fireUrl from "../assets/icons/fire.svg";
import homeUrl from "../assets/icons/home.svg";
import infoUrl from "../assets/icons/info.svg";
import learnUrl from "../assets/icons/learn.svg";
import lockUrl from "../assets/icons/lock.svg";
import microphoneUrl from "../assets/icons/microphone.svg";
import moreUrl from "../assets/icons/more.svg";
import pauseUrl from "../assets/icons/pause.svg";
import playUrl from "../assets/icons/play.svg";
import profileUrl from "../assets/icons/profile.svg";
import refreshUrl from "../assets/icons/refresh.svg";
import reviewUrl from "../assets/icons/review.svg";
import searchUrl from "../assets/icons/search.svg";
import settingsUrl from "../assets/icons/settings.svg";
import shareUrl from "../assets/icons/share.svg";
import starUrl from "../assets/icons/star.svg";
import warningUrl from "../assets/icons/warning.svg";

export const iconNames = [
  "achievement", "arrow-left", "arrow-right", "audio", "back", "book", "calendar",
  "check", "close", "error", "favorite", "fire", "home", "info", "learn", "lock",
  "microphone", "more", "pause", "play", "profile", "refresh", "review", "search",
  "settings", "share", "star", "warning",
] as const;

export type IconName = (typeof iconNames)[number];

const iconUrls: Record<IconName, string> = {
  achievement: achievementUrl,
  "arrow-left": arrowLeftUrl,
  "arrow-right": arrowRightUrl,
  audio: audioUrl,
  back: backUrl,
  book: bookUrl,
  calendar: calendarUrl,
  check: checkUrl,
  close: closeUrl,
  error: errorUrl,
  favorite: favoriteUrl,
  fire: fireUrl,
  home: homeUrl,
  info: infoUrl,
  learn: learnUrl,
  lock: lockUrl,
  microphone: microphoneUrl,
  more: moreUrl,
  pause: pauseUrl,
  play: playUrl,
  profile: profileUrl,
  refresh: refreshUrl,
  review: reviewUrl,
  search: searchUrl,
  settings: settingsUrl,
  share: shareUrl,
  star: starUrl,
  warning: warningUrl,
};

export interface IconProps {
  name: IconName;
  size?: 16 | 20 | 24 | 32;
  className?: string;
}

export function Icon({ name, size = 24, className }: IconProps) {
  const style: CSSProperties = {
    width: size,
    height: size,
    WebkitMaskImage: `url("${iconUrls[name]}")`,
    maskImage: `url("${iconUrls[name]}")`,
  };

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]", className)}
      style={style}
    />
  );
}
