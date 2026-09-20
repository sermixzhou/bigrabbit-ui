import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { FloatingFocusManager, OverlayPortal, OverlayTrigger, useOverlayFoundation } from "./overlay-foundation";

export interface DropdownMenuItem {
  id: string;
  label?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  ariaLabel?: string;
  className?: string;
}

export function DropdownMenu({ trigger, items, open, defaultOpen = false, onOpenChange, align = "end", ariaLabel, className }: DropdownMenuProps) {
  const messages = useChattyBunnyMessages();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const expanded = open ?? internalOpen;
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = items.map((item, index) => item.separator || item.disabled ? -1 : index).filter((index) => index >= 0);
  const update = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const overlay = useOverlayFoundation({ open: expanded, onOpenChange: update, placement: align === "end" ? "bottom-end" : "bottom-start", role: "menu", trigger: "click" });
  useEffect(() => {
    if (!expanded) return;
    const first = enabled[0] ?? -1;
    setActiveIndex(first);
    requestAnimationFrame(() => itemRefs.current[first]?.focus());
  }, [expanded]);
  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const position = enabled.indexOf(activeIndex);
    const next = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled[enabled.length - 1] : enabled[(position + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length];
    if (next !== undefined) { setActiveIndex(next); itemRefs.current[next]?.focus(); }
  };
  return <>
    <OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps} props={{ className, "aria-haspopup": "menu", "aria-expanded": expanded }}>{trigger}</OverlayTrigger>
    {expanded && <OverlayPortal><FloatingFocusManager context={overlay.context} modal={false} initialFocus={-1} returnFocus><div ref={overlay.refs.setFloating} style={overlay.floatingStyles} {...overlay.getFloatingProps({ onKeyDown: keydown })} aria-label={ariaLabel ?? messages.dropdownMenu} className="z-50 min-w-48 overflow-auto rounded-cb-sm border border-border bg-surface p-1.5 shadow-floating cb-scrollbar">{items.map((item, index) => item.separator ? <div key={item.id} role="separator" className="my-1 border-t border-border" /> : <button key={item.id} ref={(node) => { itemRefs.current[index] = node; }} type="button" role="menuitem" tabIndex={index === activeIndex ? 0 : -1} disabled={item.disabled} onClick={() => { item.onSelect?.(); update(false); }} className={cn("cb-focus flex min-h-11 w-full items-center gap-3 rounded-cb-sm px-3 py-2 text-left text-sm text-text-strong hover:bg-primary-subtle", item.destructive && "text-danger hover:bg-danger-soft", item.disabled && "cursor-not-allowed text-disabled-text hover:bg-transparent")}>{item.icon && <span className="flex size-5 items-center justify-center">{item.icon}</span>}<span>{item.label}</span></button>)}</div></FloatingFocusManager></OverlayPortal>}
  </>;
}
