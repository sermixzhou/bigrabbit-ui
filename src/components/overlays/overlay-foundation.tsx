import {
  FloatingPortal,
  FloatingOverlay,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
  type Placement,
} from "@floating-ui/react";
import { cloneElement, forwardRef, isValidElement, type HTMLProps, type ReactElement, type ReactNode, type Ref } from "react";
import { cn } from "../../lib/cn";

export { FloatingFocusManager, FloatingOverlay } from "@floating-ui/react";

type TriggerMode = "click" | "hover-focus" | "manual";

export interface OverlayFoundationOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement?: Placement;
  role?: "dialog" | "alertdialog" | "menu" | "listbox" | "tooltip";
  trigger?: TriggerMode;
  delay?: number;
  disabled?: boolean;
  matchReferenceWidth?: boolean;
  distance?: number;
  outsidePress?: boolean;
  escapeKey?: boolean;
}

export function useOverlayFoundation({ open, onOpenChange, placement = "bottom", role, trigger = "manual", delay = 0, disabled = false, matchReferenceWidth = false, distance = 8, outsidePress = true, escapeKey = true }: OverlayFoundationOptions) {
  const floating = useFloating({
    open,
    onOpenChange,
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(distance),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ availableHeight, rects, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${Math.max(0, availableHeight)}px`,
            minWidth: matchReferenceWidth ? `${rects.reference.width}px` : undefined,
          });
        },
      }),
    ],
  });
  const click = useClick(floating.context, { enabled: trigger === "click" && !disabled });
  const hover = useHover(floating.context, { enabled: trigger === "hover-focus" && !disabled, delay: { open: delay, close: 0 }, move: false });
  const focus = useFocus(floating.context, { enabled: trigger === "hover-focus" && !disabled });
  const dismiss = useDismiss(floating.context, { enabled: !disabled, escapeKey, outsidePress });
  const roleInteraction = useRole(floating.context, role ? { role } : undefined);
  const interactions = useInteractions([click, hover, focus, dismiss, roleInteraction]);
  return { ...floating, ...interactions };
}

type TriggerElementProps = HTMLProps<HTMLElement> & { ref?: Ref<HTMLElement>; disabled?: boolean };

export interface OverlayTriggerProps {
  children: ReactNode;
  setReference: (node: HTMLElement | null) => void;
  getReferenceProps: (props?: HTMLProps<Element>) => Record<string, unknown>;
  props?: TriggerElementProps;
}

export function OverlayTrigger({ children, setReference, getReferenceProps, props = {} }: OverlayTriggerProps) {
  const child = isValidElement(children)
    ? children as ReactElement<TriggerElementProps>
    : <button type="button">{children}</button>;
  const childProps = child.props;
  const ref = useMergeRefs([setReference, childProps.ref]);
  const describedBy = [childProps["aria-describedby"], props["aria-describedby"]].filter(Boolean).join(" ") || undefined;
  return cloneElement(child, getReferenceProps({ ...childProps, ...props, className: cn(childProps.className, props.className), "aria-describedby": describedBy, ref }) as TriggerElementProps);
}

export const OverlayPortal = FloatingPortal;

export const OverlayAnchor = forwardRef<HTMLSpanElement, { children: ReactNode }>(function OverlayAnchor({ children }, ref) {
  return <span ref={ref} className="inline-flex">{children}</span>;
});
