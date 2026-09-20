import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import type { SelectOption } from "./select";

export interface ComboboxProps {
  label?: string;
  helper?: string;
  errorMessage?: string;
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  clearable?: boolean;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  onChange?: (value: string | undefined) => void;
  onQueryChange?: (query: string) => void;
  filterOption?: (option: SelectOption, query: string) => boolean;
}

export function Combobox({ label, helper, errorMessage, placeholder = "搜索并选择", emptyMessage = "没有匹配的选项", loading = false, clearable = true, options, value, disabled, className, id: providedId, onChange, onQueryChange, filterOption = (option, query) => option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()) }: ComboboxProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);
  const [query, setQuery] = useState(selected?.label ?? "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const filtered = useMemo(() => options.filter((option) => filterOption(option, selected && query === selected.label ? "" : query)), [options, query, selected, filterOption]);
  const enabled = filtered.map((option, index) => option.disabled ? -1 : index).filter((index) => index >= 0);
  useEffect(() => { if (!open) setQuery(selected?.label ?? ""); }, [selected?.label, open]);
  useEffect(() => {
    const dismiss = (event: MouseEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", dismiss); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("mousedown", dismiss); document.removeEventListener("keydown", escape); };
  }, []);
  const choose = (option: SelectOption) => { if (option.disabled) return; onChange?.(option.value); setQuery(option.label); setOpen(false); };
  const update = (event: ChangeEvent<HTMLInputElement>) => { const next = event.target.value; setQuery(next); setOpen(true); setActiveIndex(0); onQueryChange?.(next); };
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); if (!open) setOpen(true); const current = enabled.indexOf(activeIndex); const offset = event.key === "ArrowDown" ? 1 : -1; setActiveIndex(enabled[(current < 0 ? (offset > 0 ? -1 : 0) : current) + offset] ?? enabled[offset > 0 ? 0 : enabled.length - 1] ?? -1); }
    else if (event.key === "Enter" && open && activeIndex >= 0) { event.preventDefault(); choose(filtered[activeIndex]); }
    else if (event.key === "Escape") setOpen(false);
  };
  return <div ref={rootRef} className={cn("relative w-full", className)}>{label && <label htmlFor={id} className="cb-label">{label}</label>}<div className={cn("cb-field flex h-12 items-center gap-2 pl-4", errorMessage && "cb-field-error", disabled && "cb-field-disabled")}><Icon name="search" size={20} className="text-text-subtle" /><input id={id} role="combobox" aria-expanded={open} aria-controls={`${id}-listbox`} aria-autocomplete="list" aria-activedescendant={activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage || helper ? `${id}-message` : undefined} disabled={disabled} value={query} placeholder={placeholder} onFocus={() => setOpen(true)} onChange={update} onKeyDown={onKeyDown} className="h-full min-w-0 flex-1 bg-transparent text-base text-text-strong outline-none placeholder:text-text-subtle disabled:text-disabled-text" />{loading ? <Icon name="refresh" size={20} className="mr-3 animate-spin text-primary" /> : clearable && (value || query) && !disabled ? <button type="button" aria-label="清除选择" className="cb-focus flex size-11 items-center justify-center rounded-full text-text-subtle hover:text-primary" onClick={() => { onChange?.(undefined); setQuery(""); setOpen(true); }}><Icon name="close" size={20} /></button> : null}</div>{open && !disabled && <div id={`${id}-listbox`} role="listbox" className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-cb-sm border border-border bg-surface p-1.5 shadow-floating cb-scrollbar">{loading ? <div role="status" className="flex min-h-20 items-center justify-center gap-2 text-sm text-text-muted"><Icon name="refresh" size={16} className="animate-spin" />正在加载</div> : filtered.length === 0 ? <div className="flex min-h-20 items-center justify-center px-3 text-center text-sm text-text-muted">{emptyMessage}</div> : filtered.map((option, index) => <div key={option.value} id={`${id}-option-${index}`} role="option" aria-selected={option.value === value} aria-disabled={option.disabled} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => !option.disabled && setActiveIndex(index)} onClick={() => choose(option)} className={cn("flex min-h-11 cursor-pointer items-center justify-between rounded-cb-sm px-3 py-2 text-sm", activeIndex === index && "bg-primary-subtle", option.value === value && "font-semibold text-primary", option.disabled && "cursor-not-allowed text-disabled-text")}><span>{option.label}</span>{option.value === value && <Icon name="check" size={16} />}</div>)}</div>}{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
