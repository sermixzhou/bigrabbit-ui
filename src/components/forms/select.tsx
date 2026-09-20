import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { Icon, type IconName } from "../icon";
import { FloatingFocusManager, OverlayPortal, OverlayTrigger, useOverlayFoundation } from "../overlays/overlay-foundation";

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
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
}

export function Select({ label, helper, errorMessage, placeholder, options, value, disabled, leadingIcon, className, id: providedId, name, open, defaultOpen = false, onChange, onOpenChange }: SelectProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = options[selectedIndex];
  const enabled = options.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);
  const updateOpen = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const overlay = useOverlayFoundation({ open: expanded, onOpenChange: updateOpen, placement: "bottom-start", role: "listbox", matchReferenceWidth: true, disabled });
  const move = (direction: 1 | -1) => {
    const current = enabled.indexOf(activeIndex);
    const next = current < 0 ? (direction === 1 ? 0 : enabled.length - 1) : (current + direction + enabled.length) % enabled.length;
    setActiveIndex(enabled[next] ?? -1);
  };
  useEffect(() => {
    if (expanded) setActiveIndex(selectedIndex >= 0 && !options[selectedIndex].disabled ? selectedIndex : enabled[0] ?? -1);
  }, [expanded, selectedIndex, options]);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) event.preventDefault();
    if (event.key === "ArrowDown") { if (!expanded) updateOpen(true); else move(1); }
    else if (event.key === "ArrowUp") { if (!expanded) updateOpen(true); else move(-1); }
    else if (event.key === "Home" && expanded) setActiveIndex(enabled[0] ?? -1);
    else if (event.key === "End" && expanded) setActiveIndex(enabled[enabled.length - 1] ?? -1);
    else if ((event.key === "Enter" || event.key === " ") && expanded && activeIndex >= 0) { onChange?.(options[activeIndex].value); updateOpen(false); }
    else if (event.key === "Enter" || event.key === " ") updateOpen(true);
  };
  const trigger = <button id={id} type="button" disabled={disabled} aria-haspopup="listbox" aria-expanded={expanded} aria-controls={`${id}-listbox`} aria-activedescendant={expanded && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined} aria-labelledby={label ? `${id}-label` : undefined} aria-describedby={errorMessage || helper ? `${id}-message` : undefined} aria-invalid={Boolean(errorMessage)} onClick={() => updateOpen(!expanded)} onKeyDown={onKeyDown} className={cn("cb-control cb-field flex h-12 w-full items-center gap-3 px-4 text-left", errorMessage && "cb-field-error", disabled && "cb-field-disabled")}>
    {leadingIcon && <span className="text-text-subtle">{typeof leadingIcon === "string" ? <Icon name={leadingIcon as IconName} size={20} /> : leadingIcon}</span>}<span className={cn("min-w-0 flex-1 truncate", selected ? "text-text-strong" : "text-text-subtle")}>{selected?.label ?? placeholder ?? messages.selectPlaceholder}</span><span aria-hidden="true" className={cn("text-sm text-text-subtle transition", expanded && "rotate-180")}>⌄</span>
  </button>;
  return <div className={cn("w-full", className)}>{label && <label id={`${id}-label`} className="cb-label">{label}</label>}<input type="hidden" name={name} value={value ?? ""} /><OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps}>{trigger}</OverlayTrigger>{expanded && !disabled && <OverlayPortal><FloatingFocusManager context={overlay.context} modal={false} initialFocus={-1} returnFocus><div ref={overlay.refs.setFloating} style={overlay.floatingStyles} id={`${id}-listbox`} {...overlay.getFloatingProps()} aria-labelledby={label ? `${id}-label` : undefined} className="z-50 max-h-64 overflow-auto rounded-cb-sm border border-border bg-surface p-1.5 shadow-floating cb-scrollbar">{options.map((option, index) => <div key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={option.value === value} aria-disabled={option.disabled} onMouseEnter={() => !option.disabled && setActiveIndex(index)} onMouseDown={(event) => event.preventDefault()} onClick={() => { if (!option.disabled) { onChange?.(option.value); updateOpen(false); } }} className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-cb-sm px-3 py-2 text-sm text-text-strong", activeIndex === index && "bg-primary-subtle", option.value === value && "font-semibold text-primary", option.disabled && "cursor-not-allowed text-disabled-text")}><span>{option.label}</span>{option.value === value && <Icon name="check" size={16} />}</div>)}</div></FloatingFocusManager></OverlayPortal>}{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
