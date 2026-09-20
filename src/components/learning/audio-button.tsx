import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export function AudioButton({ label = "发音", playing, size = "medium", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label?: string; playing?: boolean; size?: "small" | "medium" }) {
  return <button aria-label={playing ? `${label}，播放中` : label} className={cn("cb-control inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-primary-border bg-primary-subtle font-semibold text-primary active:scale-[.96]", size === "small" ? "size-11" : "h-11 px-4", playing && "animate-pulse-soft bg-primary text-on-primary", className)} {...props}><Icon name={playing ? "pause" : "audio"} size={20} />{size === "medium" && <span>{playing ? "播放中" : label}</span>}</button>;
}
