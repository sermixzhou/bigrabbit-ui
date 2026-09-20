import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface AccordionItem {
  value: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export function Accordion({ items, type = "single", value, defaultValue, onValueChange, className }: AccordionProps) {
  const id = useId();
  const initial = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
  const [internal, setInternal] = useState<string[]>(initial);
  const current = value === undefined ? internal : Array.isArray(value) ? value : value ? [value] : [];
  const update = (next: string[]) => { if (value === undefined) setInternal(next); onValueChange?.(type === "single" ? (next[0] ?? "") : next); };
  const toggle = (item: AccordionItem) => { if (item.disabled) return; const open = current.includes(item.value); update(type === "single" ? (open ? [] : [item.value]) : open ? current.filter((entry) => entry !== item.value) : [...current, item.value]); };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const enabled = items.map((item, itemIndex) => item.disabled ? -1 : itemIndex).filter((itemIndex) => itemIndex >= 0);
    const position = enabled.indexOf(index);
    const next = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled[enabled.length - 1] : enabled[(position + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length];
    document.getElementById(`${id}-trigger-${items[next ?? index].value}`)?.focus();
  };
  return <div className={cn("overflow-hidden rounded-cb border border-border bg-surface", className)}>{items.map((item, index) => { const open = current.includes(item.value); return <div key={item.value} className="border-b border-border last:border-0"><h3><button id={`${id}-trigger-${item.value}`} type="button" disabled={item.disabled} aria-expanded={open} aria-controls={`${id}-panel-${item.value}`} onClick={() => toggle(item)} onKeyDown={(event) => navigate(event, index)} className="cb-focus flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left font-semibold text-text-strong hover:bg-primary-subtle disabled:cursor-not-allowed disabled:bg-disabled-surface disabled:text-disabled-text sm:px-5"><span>{item.title}</span><span aria-hidden="true" className={cn("text-lg text-text-subtle transition-transform duration-150", open && "rotate-45 text-primary")}>＋</span></button></h3><div id={`${id}-panel-${item.value}`} role="region" aria-labelledby={`${id}-trigger-${item.value}`} aria-hidden={!open} inert={!open} className={cn("grid transition-[grid-template-rows,opacity] duration-150", open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0")}><div className="overflow-hidden"><div className="px-4 pb-4 text-sm leading-relaxed text-text-muted sm:px-5 sm:pb-5">{item.content}</div></div></div></div>; })}</div>;
}
