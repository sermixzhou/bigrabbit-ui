import { useId, useState, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  clearable?: boolean;
  onClear?: () => void;
}

export function Input({ label, helper, errorMessage, clearable = true, onClear, className, id: providedId, value, disabled, ...props }: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hasValue = String(value ?? "").length > 0;
  return (
    <div className="block w-full">
      {label && <label className="br-label" htmlFor={id}>{label}</label>}
      <span className={cn("flex h-12 items-center gap-2 rounded-br-sm border bg-white pl-4 transition focus-within:border-brand focus-within:bg-[#F2F7FF] focus-within:ring-4 focus-within:ring-[rgba(10,124,255,.1)]", errorMessage ? "border-danger bg-[#FFF1F0]" : "border-line", disabled && "border-[#D4DBE6] bg-[#F5F7FA]", className)}>
        <input id={id} value={value} disabled={disabled} className="h-full min-w-0 flex-1 bg-transparent text-base text-brand-deep outline-none placeholder:text-[#8A96A8] disabled:text-[#8A96A8]" aria-invalid={Boolean(errorMessage)} aria-describedby={`${id}-message`} {...props} />
        {clearable && hasValue && !disabled ? <button type="button" aria-label="清空输入" className="br-focus flex size-11 items-center justify-center rounded-full text-[#8A96A8] hover:text-brand" onClick={onClear}><Icon name="close" size={20} /></button> : errorMessage ? <span className="flex size-11 items-center justify-center text-danger"><Icon name="error" size={20} /></span> : null}
      </span>
      {(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}
    </div>
  );
}

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { loading?: boolean; onClear?: () => void; }

export function Search({ loading, value, onClear, className, ...props }: SearchProps) {
  const hasValue = String(value ?? "").length > 0;
  return (
    <label className={cn("flex h-12 w-full items-center gap-2 rounded-br-sm border border-line bg-white px-4 transition focus-within:border-brand focus-within:bg-[#F2F7FF] focus-within:ring-4 focus-within:ring-[rgba(10,124,255,.1)]", props.disabled && "bg-[#F5F7FA]", className)}>
      <Icon name="search" size={20} className="text-[#8A96A8]" />
      <input type="search" value={value} className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8A96A8]" {...props} />
      {loading ? <span className="size-4 animate-spin rounded-full border-2 border-brand border-r-transparent" /> : hasValue && !props.disabled ? <button type="button" aria-label="清空搜索" className="br-focus -mr-2 flex size-10 items-center justify-center rounded-full text-[#8A96A8]" onClick={onClear}><Icon name="close" size={20} /></button> : null}
    </label>
  );
}

interface SelectionProps { label: string; value?: string; checked?: boolean; disabled?: boolean; onChange?: (checked: boolean) => void; className?: string; }

export function Radio({ label, value, checked, disabled, onChange, className }: SelectionProps) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-base", disabled && "cursor-not-allowed text-[#8A96A8]", className)}><input className="peer sr-only" type="radio" value={value} checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="flex size-6 items-center justify-center rounded-full border border-[#D4DBE6] bg-white transition peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-[rgba(10,124,255,.2)]"><span className="size-2 rounded-full bg-white" /></span><span>{label}</span></label>;
}

export function Checkbox({ label, value, checked, disabled, onChange, className }: SelectionProps) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center gap-3 text-base", disabled && "cursor-not-allowed text-[#8A96A8]", className)}><input className="peer sr-only" type="checkbox" value={value} checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="flex size-6 items-center justify-center rounded-md border border-[#D4DBE6] bg-white text-transparent transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-[rgba(10,124,255,.2)]"><Icon name="check" size={16} /></span><span>{label}</span></label>;
}

export function Switch({ label, checked, disabled, onChange, className }: Omit<SelectionProps, "value">) {
  return <label className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-4", disabled && "cursor-not-allowed text-[#8A96A8]", className)}><span>{label}</span><input className="peer sr-only" type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} /><span className="relative h-7 w-[52px] rounded-full bg-[#D4DBE6] transition peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-[rgba(10,124,255,.2)] peer-disabled:bg-[#E5EAF2] before:absolute before:left-0.5 before:top-0.5 before:size-6 before:rounded-full before:bg-white before:shadow-sm before:transition-transform peer-checked:before:translate-x-6" /></label>;
}

export interface SegmentItem { label: string; value: string; disabled?: boolean; }

export function Segment({ items, value, onChange, disabled, className }: { items: SegmentItem[]; value: string; onChange?: (value: string) => void; disabled?: boolean; className?: string }) {
  return <div className={cn("grid min-h-11 w-full grid-flow-col auto-cols-fr rounded-br-sm bg-[#F5F7FA] p-1", className)} role="radiogroup">{items.map((item) => <button key={item.value} role="radio" aria-checked={value === item.value} disabled={disabled || item.disabled} onClick={() => onChange?.(item.value)} className={cn("br-focus rounded-[9px] px-3 py-2 text-sm font-medium text-muted transition", value === item.value && "bg-white text-brand shadow-soft", "disabled:text-[#8A96A8]")}>{item.label}</button>)}</div>;
}

export function Tabs({ items, value, onChange, variant = "line", disabled, className }: { items: SegmentItem[]; value: string; onChange?: (value: string) => void; variant?: "line" | "pill"; disabled?: boolean; className?: string }) {
  return <div className={cn("flex min-h-11 w-full items-stretch gap-1", variant === "pill" && "rounded-br-sm bg-[#F5F7FA] p-1", className)} role="tablist">{items.map((item) => <button key={item.value} role="tab" aria-selected={value === item.value} disabled={disabled || item.disabled} onClick={() => onChange?.(item.value)} className={cn("br-focus relative min-h-11 flex-1 px-3 text-sm font-medium text-muted transition", variant === "pill" ? "rounded-[9px]" : "border-b-2 border-transparent", value === item.value && (variant === "pill" ? "bg-white text-brand shadow-soft" : "border-brand text-brand"))}>{item.label}</button>)}</div>;
}

export function DemoForm() {
  const [text, setText] = useState("father");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(true);
  const [segment, setSegment] = useState("all");
  return { text, setText, search, setSearch, checked, setChecked, segment, setSegment };
}
