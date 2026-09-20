import { cn } from "../lib/cn";
import { Icon, type IconName } from "./Icon";
import { IconButton } from "./primitives";

export function TopNavigation({ title, subtitle, back = true, actionIcon, actionLabel = "更多", align = "center", onBack, onAction, className }: { title: string; subtitle?: string; back?: boolean; actionIcon?: IconName; actionLabel?: string; align?: "left" | "center"; onBack?: () => void; onAction?: () => void; className?: string }) {
  return <header className={cn("grid min-h-14 w-full grid-cols-[44px_1fr_44px] items-center border-b border-line bg-white px-2", className)}>{back ? <IconButton icon="arrow-left" label="返回" onClick={onBack} /> : <span />}<div className={cn("min-w-0", align === "center" ? "text-center" : "text-left")}><h2 className="truncate font-semibold text-brand-deep">{title}</h2>{subtitle && <p className="truncate text-xs text-muted">{subtitle}</p>}</div>{actionIcon ? <IconButton icon={actionIcon} label={actionLabel} onClick={onAction} /> : <span />}</header>;
}

export interface TabBarItem { label: string; value: string; icon: IconName; badge?: string; }

export function BottomTabBar({ items, value, onChange, className }: { items: TabBarItem[]; value: string; onChange?: (value: string) => void; className?: string }) {
  return <nav className={cn("grid w-full grid-flow-col auto-cols-fr border-t border-line bg-white px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2", className)} aria-label="主导航">{items.map((item) => { const active = item.value === value; return <button key={item.value} onClick={() => onChange?.(item.value)} className={cn("br-focus relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-br-sm text-[11px] font-medium text-[#8A96A8] hover:bg-[#F2F7FF]", active && "text-brand")} aria-current={active ? "page" : undefined}><span className="relative"><Icon name={item.icon} size={24} />{item.badge && <span className="absolute -right-3 -top-2 rounded-full bg-danger px-1 text-[9px] text-white">{item.badge}</span>}</span>{item.label}</button>; })}</nav>;
}
