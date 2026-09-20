import { useEffect, useId, useMemo, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import { Icon } from "../icon";
import { FloatingFocusManager, OverlayPortal, OverlayTrigger, useOverlayFoundation } from "../overlays/overlay-foundation";
import type { SelectOption } from "./select";

export interface ComboboxProps {
  label?: string;
  helper?: string;
  errorMessage?: string;
  placeholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  clearLabel?: string;
  loading?: boolean;
  clearable?: boolean;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onChange?: (value: string | undefined) => void;
  onQueryChange?: (query: string) => void;
  onOpenChange?: (open: boolean) => void;
  filterOption?: (option: SelectOption, query: string) => boolean;
}

export function Combobox({ label, helper, errorMessage, placeholder, emptyMessage, loadingMessage, clearLabel, loading = false, clearable = true, options, value, disabled, className, id: providedId, open, defaultOpen = false, onChange, onQueryChange, onOpenChange, filterOption = (option, query) => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()) }: ComboboxProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const selected = options.find((option) => option.value === value);
  const [query, setQuery] = useState(selected?.label ?? "");
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const expanded = open ?? internalOpen;
  const [activeIndex, setActiveIndex] = useState(-1);
  const updateOpen = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const overlay = useOverlayFoundation({ open: expanded, onOpenChange: updateOpen, placement: "bottom-start", role: "listbox", matchReferenceWidth: true, disabled });
  const filtered = useMemo(() => options.filter((option) => filterOption(option, selected && query === selected.label ? "" : query)), [options, query, selected, filterOption]);
  const enabled = filtered.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);
  useEffect(() => { if (!expanded) setQuery(selected?.label ?? ""); }, [selected?.label, expanded]);
  const choose = (option: SelectOption) => { if (option.disabled) return; onChange?.(option.value); setQuery(option.label); updateOpen(false); };
  const update = (event: ChangeEvent<HTMLInputElement>) => { const next = event.target.value; setQuery(next); updateOpen(true); setActiveIndex(0); onQueryChange?.(next); };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); if (!expanded) updateOpen(true); const current = enabled.indexOf(activeIndex); const offset = event.key === "ArrowDown" ? 1 : -1; setActiveIndex(enabled[(current < 0 ? (offset > 0 ? -1 : 0) : current) + offset] ?? enabled[offset > 0 ? 0 : enabled.length - 1] ?? -1); }
    else if (event.key === "Enter" && expanded && activeIndex >= 0) { event.preventDefault(); choose(filtered[activeIndex]); }
    else if (event.key === "Escape") updateOpen(false);
  };
  const input = <input id={id} role="combobox" aria-expanded={expanded} aria-controls={`${id}-listbox`} aria-autocomplete="list" aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage || helper ? `${id}-message` : undefined} disabled={disabled} value={query} placeholder={placeholder ?? messages.comboboxPlaceholder} onFocus={() => updateOpen(true)} onChange={update} onKeyDown={onKeyDown} className="h-full min-w-0 flex-1 bg-transparent text-base text-text-strong outline-none placeholder:text-text-subtle disabled:text-disabled-text" />;
  return <div className={cn("w-full", className)}>{label && <label htmlFor={id} className="cb-label">{label}</label>}<div className={cn("cb-field flex h-12 items-center gap-2 pl-4", errorMessage && "cb-field-error", disabled && "cb-field-disabled")}><Icon name="search" size={20} className="text-text-subtle" /><OverlayTrigger setReference={overlay.refs.setReference} getReferenceProps={overlay.getReferenceProps}>{input}</OverlayTrigger>{loading ? <Icon name="refresh" size={20} className="mr-3 animate-spin text-primary" /> : clearable && (value || query) && !disabled ? <button type="button" aria-label={clearLabel ?? messages.clearSelection} className="cb-focus flex size-11 items-center justify-center rounded-full text-text-subtle hover:text-primary" onClick={() => { onChange?.(undefined); setQuery(""); updateOpen(true); }}><Icon name="close" size={20} /></button> : null}</div>{expanded && !disabled && <OverlayPortal><FloatingFocusManager context={overlay.context} modal={false} initialFocus={-1} returnFocus><div ref={overlay.refs.setFloating} style={overlay.floatingStyles} id={`${id}-listbox`} {...overlay.getFloatingProps()} className="z-50 max-h-64 overflow-auto rounded-cb-sm border border-border bg-surface p-1.5 shadow-floating cb-scrollbar">{loading ? <div role="status" className="flex min-h-20 items-center justify-center gap-2 text-sm text-text-muted"><Icon name="refresh" size={16} className="animate-spin" />{loadingMessage ?? messages.loading}</div> : filtered.length === 0 ? <div className="flex min-h-20 items-center justify-center px-3 text-center text-sm text-text-muted">{emptyMessage ?? messages.comboboxEmpty}</div> : filtered.map((option, index) => <div key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={option.value === value} aria-disabled={option.disabled} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => !option.disabled && setActiveIndex(index)} onClick={() => choose(option)} className={cn("flex min-h-11 cursor-pointer items-center justify-between rounded-cb-sm px-3 py-2 text-sm", activeIndex === index && "bg-primary-subtle", option.value === value && "font-semibold text-primary", option.disabled && "cursor-not-allowed text-disabled-text")}><span>{option.label}</span>{option.value === value && <Icon name="check" size={16} />}</div>)}</div></FloatingFocusManager></OverlayPortal>}{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
