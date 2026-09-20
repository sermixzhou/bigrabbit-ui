import { useState, type ReactNode } from "react";
import type { Placement } from "@floating-ui/react";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { FloatingFocusManager, OverlayPortal, OverlayTrigger, useOverlayFoundation } from "./overlay-foundation";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
  showCloseButton?: boolean;
  ariaLabel?: string;
  closeLabel?: string;
  className?: string;
}

export function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, placement = "bottom", showCloseButton = false, ariaLabel, closeLabel, className }: PopoverProps) {
  const messages = useChattyBunnyMessages();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const update = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const overlay = useOverlayFoundation({ open: expanded, onOpenChange: update, placement: placement as Placement, role: "dialog", trigger: "click" });
  return <>
    <OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps} props={{ className, "aria-haspopup": "dialog", "aria-expanded": expanded }}>{trigger}</OverlayTrigger>
    {expanded && <OverlayPortal><FloatingFocusManager context={overlay.context} modal={false} initialFocus={-1} returnFocus><div ref={overlay.refs.setFloating} style={overlay.floatingStyles} {...overlay.getFloatingProps()} aria-label={ariaLabel ?? messages.popover} className="z-50 w-max max-w-[min(20rem,calc(100vw-1rem))] overflow-auto rounded-cb-sm border border-border bg-surface p-4 text-sm text-text-strong shadow-floating">{showCloseButton && <button type="button" aria-label={closeLabel ?? messages.close} onClick={() => update(false)} className="cb-focus absolute right-1 top-1 flex size-9 items-center justify-center rounded-full text-lg text-text-subtle hover:bg-primary-subtle">×</button>}{typeof children === "function" ? children(() => update(false)) : children}</div></FloatingFocusManager></OverlayPortal>}
  </>;
}
