import { useId, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { Icon } from "../icon";
import { FloatingFocusManager, FloatingOverlay, OverlayPortal, useOverlayFoundation } from "./overlay-foundation";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  size?: "small" | "medium" | "large";
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  closeLabel?: string;
  overlay?: boolean;
  className?: string;
}

export function Drawer({ open, onOpenChange, side = "right", size = "medium", title, description, footer, children, closeLabel, overlay = true, className }: DrawerProps) {
  const messages = useChattyBunnyMessages();
  const titleId = useId();
  const descriptionId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const foundation = useOverlayFoundation({ open, onOpenChange, role: "dialog", outsidePress: true });
  if (!open) return null;
  return <OverlayPortal><FloatingOverlay lockScroll className={cn("fixed inset-0 z-50", overlay && "bg-overlay")}><FloatingFocusManager context={foundation.context} modal initialFocus={closeRef} returnFocus><section ref={foundation.refs.setFloating} {...foundation.getFloatingProps()} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} className={cn("fixed inset-y-0 flex w-[min(90vw,28rem)] flex-col bg-surface shadow-floating transition-transform duration-200 motion-reduce:transition-none", side === "left" ? "left-0 border-r border-border" : "right-0 border-l border-border", size === "small" && "max-w-sm", size === "medium" && "max-w-md", size === "large" && "max-w-2xl", className)}><header className="flex items-start gap-3 border-b border-border p-5"><div className="min-w-0 flex-1"><h2 id={titleId} className="text-xl font-bold text-text-strong">{title}</h2>{description && <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>}</div><button ref={closeRef} type="button" aria-label={closeLabel ?? messages.close} onClick={() => onOpenChange(false)} className="cb-focus flex size-11 shrink-0 items-center justify-center rounded-full text-text-subtle hover:bg-primary-subtle"><Icon name="close" size={20} /></button></header><div className="cb-scrollbar flex-1 overflow-y-auto p-5">{children}</div>{footer && <footer className="border-t border-border p-4">{footer}</footer>}</section></FloatingFocusManager></FloatingOverlay></OverlayPortal>;
}
