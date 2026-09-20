import { useContext } from "react";
import { cn } from "../../lib/cn";
import { MascotSpriteContext } from "./mascot-context";
import { mascotPosition, type MascotState } from "./mascot-types";

export type { MascotState } from "./mascot-types";

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
  return <span role={decorative ? undefined : "img"} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : label} className={cn("inline-block shrink-0 rounded-cb-md bg-primary-soft bg-[length:400%_300%] bg-no-repeat", size === "small" && "size-12", size === "medium" && "size-20", size === "large" && "size-[120px]", size === "xlarge" && "size-40", className)} style={{ backgroundImage: resolvedSprite ? `url(${resolvedSprite})` : undefined, backgroundPosition: mascotPosition[state] }} />;
}
