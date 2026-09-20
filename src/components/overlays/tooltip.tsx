import { isValidElement, useState, type ReactElement, type ReactNode } from "react";
import type { Placement } from "@floating-ui/react";
import { OverlayPortal, OverlayTrigger, useOverlayFoundation } from "./overlay-foundation";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
  className?: string;
}

export function Tooltip({ content, children, placement = "top", delay = 300, disabled = false, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const overlay = useOverlayFoundation({ open: visible, onOpenChange: setVisible, placement: placement as Placement, role: "tooltip", trigger: "hover-focus", delay, disabled, distance: 6 });
  const child = isValidElement(children) ? children as ReactElement<{ tabIndex?: number }> : null;
  const intrinsicNeedsFocus = child && typeof child.type === "string" && !["a", "button", "input", "select", "textarea", "summary"].includes(child.type) && child.props.tabIndex === undefined;
  const triggerProps = intrinsicNeedsFocus ? { className, tabIndex: 0 } : { className };
  return <>
    <OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps} props={triggerProps}>{children}</OverlayTrigger>
    {visible && !disabled && <OverlayPortal><span ref={overlay.refs.setFloating} style={overlay.floatingStyles} {...overlay.getFloatingProps()} className="pointer-events-none z-50 w-max max-w-52 rounded-lg bg-text-strong px-2.5 py-1.5 text-xs leading-snug text-on-primary shadow-soft">{content}</span></OverlayPortal>}
  </>;
}
