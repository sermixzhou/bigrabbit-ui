import { useEffect, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface SidebarItem {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  badge?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  href?: string;
}

export interface SidebarGroup {
  label?: ReactNode;
  items: SidebarItem[];
}

export interface SidebarProps {
  header?: ReactNode;
  groups: SidebarGroup[];
  footer?: ReactNode;
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  onSelect?: (value: string) => void;
  ariaLabel?: string;
  closeLabel?: string;
  className?: string;
}

export function Sidebar({ header, groups, footer, collapsed = false, mobileOpen = false, onMobileOpenChange, onSelect, ariaLabel, closeLabel, className }: SidebarProps) {
  const messages = useChattyBunnyMessages();
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && mobileOpen) onMobileOpenChange?.(false); };
    document.addEventListener("keydown", escape); return () => document.removeEventListener("keydown", escape);
  }, [mobileOpen, onMobileOpenChange]);
  const content = <nav aria-label={ariaLabel ?? messages.sidebarNavigation} className="flex h-full flex-col">{header && <div className={cn("flex min-h-16 items-center border-b border-border px-4", collapsed && "justify-center px-2")}>{header}</div>}<div className="cb-scrollbar flex-1 overflow-y-auto p-3">{groups.map((group, groupIndex) => <section key={groupIndex} className="mb-5 last:mb-0">{group.label && !collapsed && <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-text-subtle">{group.label}</h2>}<div className="space-y-1">{group.items.map((item) => { const classes = cn("cb-focus flex min-h-11 w-full items-center gap-3 rounded-cb-sm px-3 text-sm font-medium transition hover:bg-primary-subtle", item.active ? "bg-primary-soft font-semibold text-primary" : "text-text-muted hover:text-text-strong", item.disabled && "cursor-not-allowed text-disabled-text hover:bg-transparent", collapsed && "justify-center px-2"); const inner = <>{item.icon && <span className="flex size-6 shrink-0 items-center justify-center">{item.icon}</span>}{!collapsed && <><span className="min-w-0 flex-1 truncate text-left">{item.label}</span>{item.badge && <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-semibold text-primary">{item.badge}</span>}</>}</>; return item.href && !item.disabled ? <a key={item.value} href={item.href} aria-current={item.active ? "page" : undefined} aria-label={collapsed && typeof item.label === "string" ? item.label : undefined} title={collapsed && typeof item.label === "string" ? item.label : undefined} className={classes} onClick={() => { onSelect?.(item.value); onMobileOpenChange?.(false); }}>{inner}</a> : <button key={item.value} type="button" disabled={item.disabled} aria-current={item.active ? "page" : undefined} aria-label={collapsed && typeof item.label === "string" ? item.label : undefined} title={collapsed && typeof item.label === "string" ? item.label : undefined} className={classes} onClick={() => { onSelect?.(item.value); onMobileOpenChange?.(false); }}>{inner}</button>; })}</div></section>)}</div>{footer && <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>{footer}</div>}</nav>;
  return <>{mobileOpen && <button type="button" aria-label={closeLabel ?? messages.closeSidebar} className="fixed inset-0 z-40 bg-overlay md:hidden" onClick={() => onMobileOpenChange?.(false)} />}<aside className={cn("fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-surface shadow-floating transition-transform md:static md:z-auto md:h-full md:translate-x-0 md:shadow-none", mobileOpen ? "translate-x-0" : "-translate-x-full", collapsed && "md:w-20", !collapsed && "md:w-64", className)}>{content}</aside></>;
}
