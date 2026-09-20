import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
  ariaLabel?: string;
  className?: string;
}

export function Breadcrumb({ items, separator = "/", maxItems = 5, ariaLabel, className }: BreadcrumbProps) {
  const messages = useChattyBunnyMessages();
  const collapsed = items.length > maxItems;
  const visible = collapsed ? [items[0], null, items[items.length - 1]] : items;
  return <nav aria-label={ariaLabel ?? messages.breadcrumb} className={cn("min-w-0", className)}><ol className="flex min-h-11 items-center gap-2 overflow-hidden text-sm text-text-muted">{visible.map((item, index) => <li key={item ? `${index}-${String(item.label)}` : "collapsed"} className="flex min-w-0 items-center gap-2">{index > 0 && <span aria-hidden="true" className="text-text-subtle">{separator}</span>}{item === null ? <span title={items.slice(1, -1).map((entry) => String(entry.label)).join(" / ")} aria-label={items.slice(1, -1).map((entry) => String(entry.label)).join(", ")}>…</span> : item.href ? <a href={item.href} onClick={item.onClick} aria-current={item.current ? "page" : undefined} className={cn("cb-focus truncate rounded-sm hover:text-primary", item.current && "font-semibold text-text-strong")}>{item.label}</a> : item.onClick ? <button type="button" onClick={item.onClick} aria-current={item.current ? "page" : undefined} className={cn("cb-focus truncate rounded-sm hover:text-primary", item.current && "font-semibold text-text-strong")}>{item.label}</button> : <span aria-current={item.current ? "page" : undefined} className={cn("truncate", item.current && "font-semibold text-text-strong")}>{item.label}</span>}</li>)}</ol></nav>;
}
