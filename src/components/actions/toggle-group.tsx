import { useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent } from "react";
import { cn } from "../../lib/cn";
import { ToggleGroupContext } from "./toggle-group-context";

export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  orientation?: "horizontal" | "vertical";
}

const normalize = (value: string | string[] | undefined) => value === undefined ? [] : Array.isArray(value) ? value : [value];

export function ToggleGroup({ type = "single", value, defaultValue, onValueChange, orientation = "horizontal", className, children, onKeyDown, ...props }: ToggleGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internal, setInternal] = useState(() => normalize(defaultValue));
  const values = value === undefined ? internal : normalize(value);
  const change = (item: string) => {
    const next = type === "single" ? (values.includes(item) ? [] : [item]) : values.includes(item) ? values.filter((entry) => entry !== item) : [...values, item];
    if (value === undefined) setInternal(next);
    onValueChange?.(type === "single" ? next[0] ?? "" : next);
  };
  useEffect(() => {
    const toggles = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-cb-toggle]:not(:disabled)") ?? []);
    if (!toggles.length) return;
    const focused = toggles.includes(document.activeElement as HTMLButtonElement) ? document.activeElement as HTMLButtonElement : undefined;
    const selected = type === "single" ? toggles.find((toggle) => toggle.getAttribute("aria-pressed") === "true") : undefined;
    const active = focused ?? selected ?? toggles[0];
    toggles.forEach((toggle) => { toggle.tabIndex = toggle === active ? 0 : -1; });
  }, [children, type, values.join("\u0000")]);
  const keydown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const toggles = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-cb-toggle]:not(:disabled)"));
    if (!toggles.length) return;
    event.preventDefault();
    const current = toggles.indexOf(document.activeElement as HTMLButtonElement);
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = event.key === "Home" ? 0 : event.key === "End" ? toggles.length - 1 : (Math.max(0, current) + direction + toggles.length) % toggles.length;
    toggles.forEach((toggle, index) => { toggle.tabIndex = index === next ? 0 : -1; });
    toggles[next].focus();
    if (type === "single") toggles[next].click();
  };
  return <ToggleGroupContext.Provider value={{ type, values, change }}><div {...props} ref={rootRef} role={props.role ?? "group"} aria-orientation={orientation} onKeyDown={keydown} className={cn("inline-flex rounded-cb-sm border border-border bg-surface p-1", orientation === "vertical" ? "flex-col" : "flex-row", className)}>{children}</div></ToggleGroupContext.Provider>;
}
