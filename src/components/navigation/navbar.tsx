import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavbarItem {
  label: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface NavbarProps {
  brand: ReactNode;
  items?: NavbarItem[];
  action?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  ariaLabel?: string;
  className?: string;
}

export function Navbar({ brand, items = [], action, open, defaultOpen = false, onOpenChange, ariaLabel = "主导航", className }: NavbarProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const update = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  useEffect(() => {
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") update(false); };
    document.addEventListener("keydown", escape); return () => document.removeEventListener("keydown", escape);
  }, [open]);
  const links = items.map((item, index) => item.href && !item.disabled ? <a key={index} href={item.href} aria-current={item.active ? "page" : undefined} onClick={() => { item.onClick?.(); update(false); }} className={cn("cb-focus inline-flex min-h-11 items-center rounded-cb-sm px-3 text-sm font-medium text-text-muted hover:bg-primary-subtle hover:text-text-strong", item.active && "bg-primary-soft font-semibold text-primary")}>{item.label}</a> : <button key={index} type="button" disabled={item.disabled} aria-current={item.active ? "page" : undefined} onClick={() => { item.onClick?.(); update(false); }} className={cn("cb-focus min-h-11 rounded-cb-sm px-3 text-left text-sm font-medium text-text-muted hover:bg-primary-subtle hover:text-text-strong", item.active && "bg-primary-soft font-semibold text-primary", item.disabled && "cursor-not-allowed text-disabled-text")}>{item.label}</button>);
  return <header className={cn("border-b border-border bg-surface", className)}><nav aria-label={ariaLabel} className="mx-auto max-w-screen-xl px-4 sm:px-6"><div className="flex min-h-16 items-center justify-between gap-4"><div className="shrink-0">{brand}</div><div className="hidden items-center gap-1 md:flex">{links}</div><div className="hidden shrink-0 md:block">{action}</div><button type="button" aria-label={expanded ? "关闭导航菜单" : "打开导航菜单"} aria-expanded={expanded} onClick={() => update(!expanded)} className="cb-focus flex size-11 items-center justify-center rounded-cb-sm text-xl text-text-strong hover:bg-primary-subtle md:hidden"><span aria-hidden="true">{expanded ? "×" : "☰"}</span></button></div>{expanded && <div className="border-t border-border py-3 md:hidden"><div className="flex flex-col gap-1">{links}</div>{action && <div className="mt-3 border-t border-border pt-3">{action}</div>}</div>}</nav></header>;
}
