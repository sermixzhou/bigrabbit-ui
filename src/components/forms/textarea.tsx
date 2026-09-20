import { useId, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  showCount?: boolean;
}

export function Textarea({ label, helper, errorMessage, showCount = false, className, id: providedId, value, defaultValue, maxLength, disabled, rows = 4, ...props }: TextareaProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const length = String(value ?? defaultValue ?? "").length;
  const hasMessage = Boolean(errorMessage || helper || (showCount && maxLength));
  return <div className="w-full">
    {label && <label className="cb-label" htmlFor={id}>{label}</label>}
    <textarea id={id} rows={rows} value={value} defaultValue={defaultValue} maxLength={maxLength} disabled={disabled} aria-invalid={Boolean(errorMessage)} aria-describedby={hasMessage ? `${id}-message` : undefined} className={cn("cb-field min-h-28 w-full resize-y px-4 py-3 text-base leading-relaxed text-text-strong outline-none placeholder:text-text-subtle disabled:resize-none", errorMessage && "cb-field-error", disabled && "cb-field-disabled", className)} {...props} />
    {hasMessage && <span id={`${id}-message`} className="mt-1.5 flex min-h-5 items-start justify-between gap-3 text-xs"><span className={cn("flex items-center gap-1", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage && <Icon name="error" size={16} />}{errorMessage ?? helper}</span>{showCount && maxLength && <span className="shrink-0 text-text-subtle" aria-label={`${length} / ${maxLength} characters`}>{length} / {maxLength}</span>}</span>}
  </div>;
}
