import { useId, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export function Slider({ label, showValue = false, formatValue = String, min = 0, max = 100, value, defaultValue, className, id: providedId, disabled, ...props }: SliderProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const displayed = Number(value ?? defaultValue ?? min);
  const percentage = ((displayed - Number(min)) / Math.max(1, Number(max) - Number(min))) * 100;
  return <div className={cn("w-full", className)}>{(label || showValue) && <div className="mb-2 flex items-center justify-between gap-3">{label ? <label htmlFor={id} className="text-sm font-semibold text-text-strong">{label}</label> : <span />}{showValue && <output htmlFor={id} className="rounded-full bg-primary-subtle px-2.5 py-1 text-xs font-semibold text-primary">{formatValue(displayed)}</output>}</div>}<input {...props} id={id} type="range" min={min} max={max} value={value} defaultValue={defaultValue} disabled={disabled} style={{ background: disabled ? undefined : `linear-gradient(to right, var(--cb-primary) ${percentage}%, var(--cb-border) ${percentage}%)` }} className="cb-focus h-11 w-full cursor-pointer appearance-none rounded-full bg-transparent accent-primary disabled:cursor-not-allowed [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-soft [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:-mt-2 [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-soft" /></div>;
}
