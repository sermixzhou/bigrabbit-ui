import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "top" | "bottom" | "left" | "right";
  showCloseButton?: boolean;
  ariaLabel?: string;
  className?: string;
}

const placementClasses = { top: "bottom-full left-1/2 mb-2 -translate-x-1/2", bottom: "left-1/2 top-full mt-2 -translate-x-1/2", left: "right-full top-1/2 mr-2 -translate-y-1/2", right: "left-full top-1/2 ml-2 -translate-y-1/2" };

export function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, placement = "bottom", showCloseButton = false, ariaLabel = "弹出内容", className }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);
  const update = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  useEffect(() => {
    const dismiss = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) update(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") update(false); };
    document.addEventListener("mousedown", dismiss); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div ref={rootRef} className={cn("relative inline-block", className)}><button type="button" aria-haspopup="dialog" aria-expanded={expanded} onClick={() => update(!expanded)} className="cb-focus inline-flex min-h-11 items-center justify-center rounded-cb-sm">{trigger}</button>{expanded && <div role="dialog" aria-label={ariaLabel} className={cn("absolute z-50 w-max max-w-[min(20rem,calc(100vw-2rem))] rounded-cb-sm border border-border bg-surface p-4 text-sm text-text-strong shadow-floating", placementClasses[placement])}>{showCloseButton && <button type="button" aria-label="关闭" onClick={() => update(false)} className="cb-focus absolute right-1 top-1 flex size-9 items-center justify-center rounded-full text-lg text-text-subtle hover:bg-primary-subtle">×</button>}{typeof children === "function" ? children(() => update(false)) : children}</div>}</div>;
}
