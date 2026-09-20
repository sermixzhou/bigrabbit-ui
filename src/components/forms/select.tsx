import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  helper?: string;
  errorMessage?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  leadingIcon?: IconName | ReactNode;
  className?: string;
  id?: string;
  name?: string;
  onChange?: (value: string) => void;
}

export function Select({ label, helper, errorMessage, placeholder = "请选择", options, value, disabled, leadingIcon, className, id: providedId, name, onChange }: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const enabled = options.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);
  const move = (direction: 1 | -1) => {
    const current = enabled.indexOf(activeIndex);
    const next = current < 0 ? (direction === 1 ? 0 : enabled.length - 1) : (current + direction + enabled.length) % enabled.length;
    setActiveIndex(enabled[next] ?? -1);
  };
  useEffect(() => {
    const dismiss = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", dismiss); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", dismiss); document.removeEventListener("keydown", escape); };
  }, []);
  useEffect(() => { if (open) setActiveIndex(selectedIndex >= 0 && !options[selectedIndex].disabled ? selectedIndex : enabled[0] ?? -1); }, [open]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) event.preventDefault();
    if (event.key === "ArrowDown") { if (!open) setOpen(true); else move(1); }
    else if (event.key === "ArrowUp") { if (!open) setOpen(true); else move(-1); }
    else if (event.key === "Home" && open) setActiveIndex(enabled[0] ?? -1);
    else if (event.key === "End" && open) setActiveIndex(enabled[enabled.length - 1] ?? -1);
    else if ((event.key === "Enter" || event.key === " ") && open && activeIndex >= 0) { onChange?.(options[activeIndex].value); setOpen(false); }
    else if (event.key === "Enter" || event.key === " ") setOpen(true);
  };
  return <div ref={rootRef} className={cn("relative w-full", className)}>{label && <label id={`${id}-label`} className="cb-label">{label}</label>}<input type="hidden" name={name} value={value ?? ""} /><button id={id} type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-listbox`} aria-activedescendant={open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined} aria-labelledby={label ? `${id}-label` : undefined} aria-describedby={errorMessage || helper ? `${id}-message` : undefined} aria-invalid={Boolean(errorMessage)} onClick={() => setOpen((current) => !current)} onKeyDown={onKeyDown} className={cn("cb-control cb-field flex h-12 w-full items-center gap-3 px-4 text-left", errorMessage && "cb-field-error", disabled && "cb-field-disabled")}>
    {leadingIcon && <span className="text-text-subtle">{typeof leadingIcon === "string" ? <Icon name={leadingIcon as IconName} size={20} /> : leadingIcon}</span>}<span className={cn("min-w-0 flex-1 truncate", selected ? "text-text-strong" : "text-text-subtle")}>{selected?.label ?? placeholder}</span><span aria-hidden="true" className={cn("text-sm text-text-subtle transition", open && "rotate-180")}>⌄</span>
  </button>{open && !disabled && <div id={`${id}-listbox`} role="listbox" aria-labelledby={label ? `${id}-label` : undefined} className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-cb-sm border border-border bg-surface p-1.5 shadow-floating cb-scrollbar">{options.map((option, index) => <div key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={option.value === value} aria-disabled={option.disabled} onMouseEnter={() => !option.disabled && setActiveIndex(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => { if (!option.disabled) { onChange?.(option.value); setOpen(false); } }} className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-cb-sm px-3 py-2 text-sm text-text-strong", activeIndex === index && "bg-primary-subtle", option.value === value && "font-semibold text-primary", option.disabled && "cursor-not-allowed text-disabled-text")}><span>{option.label}</span>{option.value === value && <Icon name="check" size={16} />}</div>)}</div>}{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
