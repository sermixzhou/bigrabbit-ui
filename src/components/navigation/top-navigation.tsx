import { cn } from "../../lib/cn";
import type { IconName } from "../icon";
import { IconButton } from "../primitives";

export function TopNavigation({ title, subtitle, back = true, actionIcon, actionLabel = "更多", align = "center", onBack, onAction, className }: { title: string; subtitle?: string; back?: boolean; actionIcon?: IconName; actionLabel?: string; align?: "left" | "center"; onBack?: () => void; onAction?: () => void; className?: string }) {
  return <header className={cn("grid min-h-14 w-full grid-cols-[44px_1fr_44px] items-center border-b border-border bg-surface px-2", className)}>{back ? <IconButton icon="arrow-left" label="返回" onClick={onBack} /> : <span />}<div className={cn("min-w-0", align === "center" ? "text-center" : "text-left")}><h2 className="truncate font-semibold text-text-strong">{title}</h2>{subtitle && <p className="truncate text-xs text-text-muted">{subtitle}</p>}</div>{actionIcon ? <IconButton icon={actionIcon} label={actionLabel} onClick={onAction} /> : <span />}</header>;
}
