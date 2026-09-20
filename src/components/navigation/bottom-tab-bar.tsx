import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface TabBarItem { label: string; value: string; icon: IconName; badge?: string; }

export function BottomTabBar({ items, value, onChange, ariaLabel, className }: { items: TabBarItem[]; value: string; onChange?: (value: string) => void; ariaLabel?: string; className?: string }) {
  const messages = useChattyBunnyMessages();
  return <nav className={cn("grid w-full grid-flow-col auto-cols-fr border-t border-border bg-surface px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2", className)} aria-label={ariaLabel ?? messages.mainNavigation}>{items.map((item) => { const active = item.value === value; return <button key={item.value} onClick={() => onChange?.(item.value)} className={cn("cb-focus relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-cb-sm text-[11px] font-medium text-text-subtle hover:bg-primary-subtle", active && "text-primary")} aria-current={active ? "page" : undefined}><span className="relative"><Icon name={item.icon} size={24} />{item.badge && <span className="absolute -right-3 -top-2 rounded-full bg-danger px-1 text-[9px] text-on-primary">{item.badge}</span>}</span>{item.label}</button>; })}</nav>;
}
