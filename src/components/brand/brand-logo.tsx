import { cn } from "../../lib/cn";
import { Mascot } from "./mascot";

export function BrandLogo({ variant = "horizontal", size = "medium", name = "Chatty Bunny", tagline = "每天一点 · 看见更大的自己" }: { variant?: "app-icon" | "horizontal" | "compact" | "mascot-only"; size?: "medium" | "large"; name?: string; tagline?: string }) {
  if (variant === "mascot-only") return <Mascot size={size === "large" ? "large" : "medium"} />;
  if (variant === "app-icon") return <span className="inline-flex size-20 items-center justify-center overflow-hidden rounded-cb bg-primary shadow-soft"><Mascot size="medium" /></span>;
  return <span className="inline-flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-cb-md bg-primary-subtle"><Mascot size="small" decorative /></span><span className="min-w-0"><strong className={cn("block text-text-strong", size === "large" ? "text-2xl" : "text-xl")}>{name}</strong>{variant === "horizontal" && <span className="block text-xs tracking-wide text-text-muted">{tagline}</span>}</span></span>;
}
