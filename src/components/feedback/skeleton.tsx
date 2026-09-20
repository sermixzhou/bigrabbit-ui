import { cn } from "../../lib/cn";

export function Skeleton({ variant = "card", rows = 3, animated = true }: { variant?: "text" | "list" | "card"; rows?: number; animated?: boolean }) {
  return <div aria-label="内容加载中" className={cn("w-full", variant === "card" && "cb-card")}><div className="flex items-center gap-3">{variant !== "text" && <span className={cn("size-12 rounded-cb-md bg-surface-placeholder", animated && "animate-pulse")} />}<div className="flex-1"><span className={cn("block h-3 w-2/3 rounded-full bg-surface-placeholder", animated && "animate-pulse")} /><span className={cn("mt-2 block h-3 w-1/2 rounded-full bg-surface-placeholder", animated && "animate-pulse")} /></div></div><div className="mt-4 space-y-3">{Array.from({ length: rows }).map((_, index) => <span key={index} className={cn("block h-3 rounded-full bg-surface-placeholder", index === rows - 1 ? "w-3/5" : "w-full", animated && "animate-pulse")} />)}</div></div>;
}
