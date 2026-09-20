import { useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

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
  return <div className="block w-full">{label && <label className="cb-label" htmlFor={id}>{label}</label>}<span className={cn("flex h-12 items-center gap-2 rounded-cb-sm border bg-white pl-4 transition focus-within:border-brand focus-within:bg-[#F2F7FF] focus-within:ring-4 focus-within:ring-[rgba(10,124,255,.1)]", errorMessage ? "border-danger bg-[#FFF1F0]" : "border-line", disabled && "border-[#D4DBE6] bg-[#F5F7FA]", className)}><input id={id} value={value} disabled={disabled} className="h-full min-w-0 flex-1 bg-transparent text-base text-brand-deep outline-none placeholder:text-[#8A96A8] disabled:text-[#8A96A8]" aria-invalid={Boolean(errorMessage)} aria-describedby={`${id}-message`} {...props} />{clearable && hasValue && !disabled ? <button type="button" aria-label="清空输入" className="cb-focus flex size-11 items-center justify-center rounded-full text-[#8A96A8] hover:text-brand" onClick={onClear}><Icon name="close" size={20} /></button> : errorMessage ? <span className="flex size-11 items-center justify-center text-danger"><Icon name="error" size={20} /></span> : null}</span>{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
