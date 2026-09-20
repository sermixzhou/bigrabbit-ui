import { useEffect, useId, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  helper?: string;
  errorMessage?: string;
  incrementLabel?: string;
  decrementLabel?: string;
  onValueChange?: (value: number) => void;
}

const clamp = (value: number, min?: number, max?: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));
const decimals = (step: number) => (String(step).split(".")[1]?.length ?? 0);

export function NumberInput({ value, defaultValue = 0, min, max, step = 1, label, helper, errorMessage, incrementLabel, decrementLabel, onValueChange, disabled, className, id: providedId, ...props }: NumberInputProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(() => clamp(defaultValue, min, max));
  const current = controlled ? value : internal;
  const [display, setDisplay] = useState(String(current));
  useEffect(() => setDisplay(String(current)), [current]);
  const commit = (next: number) => {
    const safe = Number.isFinite(next) ? clamp(next, min, max) : clamp(0, min, max);
    const rounded = Number(safe.toFixed(decimals(step)));
    if (!controlled) setInternal(rounded);
    setDisplay(String(rounded));
    onValueChange?.(rounded);
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    if (!/^-?\d*(?:\.\d*)?$/.test(next)) return;
    setDisplay(next);
    const parsed = Number(next);
    if (next !== "" && next !== "-" && next !== "." && next !== "-.") onValueChange?.(parsed);
  };
  const messageId = errorMessage || helper ? `${id}-message` : undefined;
  return <div className={cn("w-full", className)}>{label && <label htmlFor={id} className="cb-label">{label}</label>}<div className={cn("cb-field grid h-12 grid-cols-[44px_minmax(0,1fr)_44px] items-center", errorMessage && "cb-field-error", disabled && "cb-field-disabled")}><button type="button" aria-label={decrementLabel ?? messages.decrement} disabled={disabled || current <= (min ?? -Infinity)} onClick={() => commit(current - step)} className="cb-focus flex size-11 items-center justify-center rounded-cb-sm text-xl text-text-muted hover:bg-primary-subtle disabled:text-disabled-text">−</button><input {...props} id={id} type="text" inputMode="decimal" value={display} disabled={disabled} aria-invalid={Boolean(errorMessage)} aria-describedby={messageId} onChange={change} onBlur={() => commit(Number(display))} onKeyDown={(event) => { if (event.key === "ArrowUp") { event.preventDefault(); commit(current + step); } else if (event.key === "ArrowDown") { event.preventDefault(); commit(current - step); } }} className="h-full min-w-0 bg-transparent text-center text-base font-semibold text-text-strong outline-none disabled:text-disabled-text" /><button type="button" aria-label={incrementLabel ?? messages.increment} disabled={disabled || current >= (max ?? Infinity)} onClick={() => commit(current + step)} className="cb-focus flex size-11 items-center justify-center rounded-cb-sm text-xl text-text-muted hover:bg-primary-subtle disabled:text-disabled-text">+</button></div>{messageId && <span id={messageId} className={cn("mt-1.5 block text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage ?? helper}</span>}</div>;
}
