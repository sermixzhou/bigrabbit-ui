import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { FloatingFocusManager, OverlayPortal, OverlayTrigger, useOverlayFoundation } from "../overlays/overlay-foundation";

export interface NavigationMenuChild {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface NavigationMenuItem {
  value: string;
  label: ReactNode;
  href?: string;
  children?: NavigationMenuChild[];
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

function DesktopDropdown({ item, open, setOpen }: { item: NavigationMenuItem; open: boolean; setOpen: (open: boolean) => void }) {
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const overlay = useOverlayFoundation({ open, onOpenChange: setOpen, placement: "bottom-start", role: "menu", trigger: "click" });
  useEffect(() => { if (open) requestAnimationFrame(() => itemRefs.current.find(Boolean)?.focus()); }, [open]);
  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!item.children || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const enabled = itemRefs.current.filter((entry): entry is HTMLElement => Boolean(entry));
    if (!enabled.length) return;
    event.preventDefault();
    const current = enabled.indexOf(document.activeElement as HTMLElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? enabled.length - 1 : (Math.max(0, current) + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length;
    enabled[next].focus();
  };
  return <><OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps} props={{ "aria-haspopup": "menu", "aria-expanded": open }}><button type="button" data-cb-navigation-trigger className="cb-focus flex min-h-11 items-center gap-1 rounded-cb-sm px-3 text-sm font-semibold text-text-muted hover:bg-primary-subtle hover:text-text-strong">{item.label}<span aria-hidden="true" className={cn("transition", open && "rotate-180")}>⌄</span></button></OverlayTrigger>{open && <OverlayPortal><FloatingFocusManager context={overlay.context} modal={false} initialFocus={-1} returnFocus><div ref={overlay.refs.setFloating} style={overlay.floatingStyles} {...overlay.getFloatingProps({ onKeyDown: keydown })} className="z-50 grid min-w-72 gap-1 overflow-auto rounded-cb border border-border bg-surface p-2 shadow-floating">{item.children?.map((child, index) => { const content = <>{child.icon && <span className="mt-0.5 text-primary">{child.icon}</span>}<span><strong className="block text-sm text-text-strong">{child.title}</strong>{child.description && <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">{child.description}</span>}</span></>; const shared = { role: "menuitem", "aria-disabled": child.disabled || undefined, tabIndex: child.disabled ? -1 : 0, onClick: (event: MouseEvent<HTMLElement>) => { if (child.disabled) event.preventDefault(); else { child.onSelect?.(); setOpen(false); } }, className: cn("cb-focus flex min-h-14 w-full items-start gap-3 rounded-cb-sm px-3 py-2.5 text-left hover:bg-primary-subtle", child.disabled && "pointer-events-none text-disabled-text") }; return child.href ? <a key={child.title} ref={(node) => { itemRefs.current[index] = child.disabled ? null : node; }} href={child.disabled ? undefined : child.href} {...shared}>{content}</a> : <button key={child.title} ref={(node) => { itemRefs.current[index] = child.disabled ? null : node; }} type="button" disabled={child.disabled} {...shared}>{content}</button>; })}</div></FloatingFocusManager></OverlayPortal>}</>;
}

export function NavigationMenu({ items, value, defaultValue = "", onValueChange, ariaLabel, className }: NavigationMenuProps) {
  const messages = useChattyBunnyMessages();
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const update = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const triggers = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[data-cb-navigation-trigger]"));
    if (!triggers.length) return;
    event.preventDefault();
    const current = triggers.indexOf(document.activeElement as HTMLElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? triggers.length - 1 : (Math.max(0, current) + (event.key === "ArrowRight" ? 1 : -1) + triggers.length) % triggers.length;
    triggers[next].focus();
  };
  return <nav aria-label={ariaLabel ?? messages.navigationMenu} className={className}><div className="hidden items-center gap-1 md:flex" onKeyDown={keydown}>{items.map((item) => item.children?.length ? <DesktopDropdown key={item.value} item={item} open={active === item.value} setOpen={(open) => update(open ? item.value : "")} /> : item.href ? <a key={item.value} data-cb-navigation-trigger href={item.href} className="cb-focus flex min-h-11 items-center rounded-cb-sm px-3 text-sm font-semibold text-text-muted hover:bg-primary-subtle hover:text-text-strong">{item.label}</a> : <span key={item.value} className="flex min-h-11 items-center px-3 text-sm font-semibold text-text-muted">{item.label}</span>)}</div><div className="space-y-1 md:hidden">{items.map((item) => item.children?.length ? <details key={item.value} className="rounded-cb-sm border border-border bg-surface"><summary className="cb-focus flex min-h-11 cursor-pointer list-none items-center justify-between px-3 text-sm font-semibold text-text-strong">{item.label}<span aria-hidden="true">⌄</span></summary><div className="border-t border-border p-2">{item.children.map((child) => child.href ? <a key={child.title} href={child.disabled ? undefined : child.href} aria-disabled={child.disabled || undefined} onClick={(event) => { if (child.disabled) event.preventDefault(); else child.onSelect?.(); }} className={cn("block rounded-cb-sm px-3 py-2", child.disabled ? "text-disabled-text" : "hover:bg-primary-subtle")}><strong className="block text-sm">{child.title}</strong>{child.description && <span className="block text-xs text-text-muted">{child.description}</span>}</a> : <button key={child.title} type="button" disabled={child.disabled} onClick={child.onSelect} className="block w-full rounded-cb-sm px-3 py-2 text-left hover:bg-primary-subtle disabled:text-disabled-text"><strong className="block text-sm">{child.title}</strong>{child.description && <span className="block text-xs text-text-muted">{child.description}</span>}</button>)}</div></details> : item.href ? <a key={item.value} href={item.href} className="flex min-h-11 items-center rounded-cb-sm px-3 text-sm font-semibold text-text-muted">{item.label}</a> : <span key={item.value} className="flex min-h-11 items-center px-3 text-sm font-semibold text-text-muted">{item.label}</span>)}</div></nav>;
}
