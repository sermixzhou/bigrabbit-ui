import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
  className?: string;
}

const placementClasses = { top: "bottom-full left-1/2 mb-2 -translate-x-1/2", bottom: "left-1/2 top-full mt-2 -translate-x-1/2", left: "right-full top-1/2 mr-2 -translate-y-1/2", right: "left-full top-1/2 ml-2 -translate-y-1/2" };

export function Tooltip({ content, children, placement = "top", delay = 300, disabled = false, className }: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = () => { if (!disabled) timer.current = setTimeout(() => setVisible(true), delay); };
  const hide = () => { clearTimeout(timer.current); setVisible(false); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return <span className={cn("relative inline-flex", className)} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} onKeyDown={(event) => { if (event.key === "Escape") hide(); }} tabIndex={0} aria-describedby={visible ? id : undefined}>{children}{visible && <span id={id} role="tooltip" className={cn("pointer-events-none absolute z-50 w-max max-w-52 rounded-lg bg-text-strong px-2.5 py-1.5 text-xs leading-snug text-on-primary shadow-soft", placementClasses[placement])}>{content}</span>}</span>;
}
