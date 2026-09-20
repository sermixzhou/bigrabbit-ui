import { useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { ChoiceGroupContext } from "./choice-group-context";

export interface ChoiceGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  children: ReactNode;
  selectionMode?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function normalize(value: string | string[] | undefined) {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

export function ChoiceGroup({ children, selectionMode = "single", value, defaultValue, onValueChange, className, onKeyDown, ...props }: ChoiceGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(() => normalize(defaultValue));
  const selectedValues = value === undefined ? internalValue : normalize(value);
  const toggle = (nextValue: string) => {
    const next = selectionMode === "single"
      ? [nextValue]
      : selectedValues.includes(nextValue) ? selectedValues.filter((item) => item !== nextValue) : [...selectedValues, nextValue];
    if (value === undefined) setInternalValue(next);
    onValueChange?.(selectionMode === "single" ? next[0] ?? "" : next);
  };
  useEffect(() => {
    if (selectionMode !== "single") return;
    const cards = rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-cb-choice]:not(:disabled)");
    if (cards?.length && !Array.from(cards).some((card) => card.tabIndex === 0)) cards[0].tabIndex = 0;
  }, [children, selectedValues.join("\u0000"), selectionMode]);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || selectionMode !== "single" || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const cards = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-cb-choice]:not(:disabled)"));
    if (!cards.length) return;
    event.preventDefault();
    const current = cards.indexOf(document.activeElement as HTMLButtonElement);
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? cards.length - 1 : (Math.max(0, current) + direction + cards.length) % cards.length;
    cards[nextIndex].focus();
    cards[nextIndex].click();
  };
  return <ChoiceGroupContext.Provider value={{ selectionMode, selectedValues, toggle }}><div {...props} ref={rootRef} role={selectionMode === "single" ? "radiogroup" : "group"} onKeyDown={handleKeyDown} className={cn("grid gap-3", className)}>{children}</div></ChoiceGroupContext.Provider>;
}
