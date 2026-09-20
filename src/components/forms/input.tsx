import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  clearable?: boolean;
  onClear?: () => void;
  trailing?: ReactNode;
}

export function Input({ label, helper, errorMessage, clearable = true, onClear, trailing, className, id: providedId, value, disabled, ...props }: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const hasValue = String(value ?? "").length > 0;
  return <div className="block w-full">{label && <label className="cb-label" htmlFor={id}>{label}</label>}<span className={cn("cb-field flex h-12 items-center gap-2 pl-4", errorMessage && "cb-field-error border-danger bg-danger-soft", disabled && "cb-field-disabled border-disabled-border bg-disabled-surface", className)}><input id={id} value={value} disabled={disabled} className="h-full min-w-0 flex-1 bg-transparent text-base text-text-strong outline-none placeholder:text-text-subtle disabled:text-disabled-text" aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage || helper ? `${id}-message` : undefined} {...props} />{trailing ?? (clearable && hasValue && !disabled ? <button type="button" aria-label="清空输入" className="cb-focus flex size-11 items-center justify-center rounded-full text-text-subtle hover:text-primary" onClick={onClear}><Icon name="close" size={20} /></button> : errorMessage ? <span className="flex size-11 items-center justify-center text-danger"><Icon name="error" size={20} /></span> : null)}</span>{(errorMessage || helper) && <span id={`${id}-message`} className={cn("mt-1.5 flex min-h-5 items-center gap-1 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>}</div>;
}
