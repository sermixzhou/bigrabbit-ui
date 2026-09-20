import { createContext, useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "./Icon";

export type MascotState = "welcome" | "learning" | "thinking" | "success" | "error" | "encourage" | "empty" | "locked" | "sleep" | "celebrate";

const mascotPosition: Record<MascotState, string> = {
  welcome: "0% 0%",
  learning: "33.333% 0%",
  thinking: "66.666% 0%",
  success: "100% 0%",
  error: "0% 50%",
  encourage: "33.333% 50%",
  empty: "66.666% 50%",
  locked: "100% 50%",
  sleep: "0% 100%",
  celebrate: "33.333% 100%",
};

const MascotSpriteContext = createContext<string | undefined>(undefined);

export function MascotProvider({ spriteSrc, children }: { spriteSrc: string; children: ReactNode }) {
  return <MascotSpriteContext.Provider value={spriteSrc}>{children}</MascotSpriteContext.Provider>;
}

export interface MascotProps {
  state?: MascotState;
  size?: "small" | "medium" | "large" | "xlarge";
  label?: string;
  decorative?: boolean;
  className?: string;
  /** Supply your own compatible 4×3 sprite sheet to replace the demonstration mascot. */
  spriteSrc?: string;
}

export function Mascot({ state = "welcome", size = "medium", label = "大嘴小兔", decorative = false, className, spriteSrc }: MascotProps) {
  const providedSprite = useContext(MascotSpriteContext);
  const resolvedSprite = spriteSrc ?? providedSprite;
  return <span role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : label} className={cn("inline-block shrink-0 rounded-br-md bg-[#E6F1FF] bg-[length:400%_300%] bg-no-repeat", size === "small" && "size-12", size === "medium" && "size-20", size === "large" && "size-[120px]", size === "xlarge" && "size-40", className)} style={{ backgroundImage: resolvedSprite ? `url(${resolvedSprite})` : undefined, backgroundPosition: mascotPosition[state] }} />;
}

export function BrandLogo({ variant = "horizontal", size = "medium", name = "大嘴小兔学英语", tagline = "每天一点 · 看见更大的自己" }: { variant?: "app-icon" | "horizontal" | "compact" | "mascot-only"; size?: "medium" | "large"; name?: string; tagline?: string }) {
  if (variant === "mascot-only") return <Mascot size={size === "large" ? "large" : "medium"} />;
  if (variant === "app-icon") return <span className="inline-flex size-20 items-center justify-center overflow-hidden rounded-br bg-brand shadow-soft"><Mascot size="medium" /></span>;
  return <span className="inline-flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-br-md bg-[#F2F7FF]"><Mascot size="small" decorative /></span><span className="min-w-0"><strong className={cn("block text-brand-deep", size === "large" ? "text-2xl" : "text-xl")}>{variant === "compact" ? "大嘴小兔" : name}</strong>{variant === "horizontal" && <span className="block text-xs tracking-wide text-muted">{tagline}</span>}</span></span>;
}

export function MascotCallout({ message, supportingText, state = "encourage", placement = "left" }: { message: string; supportingText?: string; state?: MascotState; placement?: "left" | "right" }) {
  return <div className={cn("flex items-center gap-3", placement === "right" && "flex-row-reverse")}><Mascot state={state} size="medium" /><div className={cn("relative flex-1 rounded-br bg-[#F2F7FF] p-4", placement === "left" ? "before:absolute before:-left-2 before:top-7 before:border-y-8 before:border-r-8 before:border-y-transparent before:border-r-[#F2F7FF]" : "after:absolute after:-right-2 after:top-7 after:border-y-8 after:border-l-8 after:border-y-transparent after:border-l-[#F2F7FF]")}><p className="font-semibold text-brand-deep">{message}</p>{supportingText && <p className="mt-1 text-sm text-muted">{supportingText}</p>}</div></div>;
}

export function AchievementBadge({ label, description, icon = "achievement", variant = "blue", state = "earned", size = "medium", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string; description?: string; icon?: IconName; variant?: "blue" | "gold"; state?: "earned" | "progress" | "locked"; size?: "small" | "medium" }) {
  const locked = state === "locked";
  return <button className={cn("br-focus inline-flex flex-col items-center rounded-br-sm p-2 text-center", className)} disabled={locked} {...props}><span className={cn("flex items-center justify-center rounded-[18px] border-4 text-white shadow-soft", size === "small" ? "size-12" : "size-16", variant === "blue" ? "border-[#A9CFFF] bg-brand" : "border-[#FDE68A] bg-warning", locked && "border-[#D4DBE6] bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={locked ? "lock" : icon} size={size === "small" ? 24 : 32} /></span><span className="mt-2 text-sm font-semibold text-brand-deep">{label}</span>{description && <span className="mt-0.5 text-xs text-muted">{description}</span>}</button>;
}

export function StreakBadge({ days, label = "连续学习", state = "active", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { days: number; label?: string; state?: "default" | "active" | "completed" }) {
  return <button className={cn("br-control inline-flex min-h-11 items-center gap-2 rounded-br-md border border-[#FDE7AA] bg-[#FFF8E6] px-3 text-left", state === "completed" && "border-[#BBF7D0] bg-[#ECFDF3]", className)} {...props}><Icon name={state === "completed" ? "check" : "fire"} className={state === "completed" ? "text-success" : "text-warning"} /><span><strong className="block text-brand-deep">{days} 天</strong><small className="block text-xs text-muted">{label}</small></span></button>;
}
