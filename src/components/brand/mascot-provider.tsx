import type { ReactNode } from "react";
import { MascotSpriteContext } from "./mascot-context";

export function MascotProvider({ spriteSrc, children }: { spriteSrc: string; children: ReactNode }) {
  return <MascotSpriteContext.Provider value={spriteSrc}>{children}</MascotSpriteContext.Provider>;
}
