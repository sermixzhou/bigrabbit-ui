import { useId, useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mode?: "numeric" | "alphanumeric";
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export function OTPInput({ length = 6, value = "", onChange, onComplete, mode = "numeric", label, errorMessage, disabled, className, id: providedId, name }: OTPInputProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const clean = (input: string) => (mode === "numeric" ? input.replace(/\D/g, "") : input.replace(/[^a-z0-9]/gi, "").toUpperCase()).slice(0, length);
  const update = (next: string) => { const normalized = clean(next); onChange?.(normalized); if (normalized.length === length) onComplete?.(normalized); };
  const setAt = (index: number, character: string) => {
    const chars = value.padEnd(length).split("");
    chars[index] = clean(character).slice(-1);
    const next = chars.join("").trimEnd();
    update(next);
    if (character && index < length - 1) inputs.current[index + 1]?.focus();
  };
  const keydown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") { event.preventDefault(); if (value[index]) setAt(index, ""); else if (index > 0) { setAt(index - 1, ""); inputs.current[index - 1]?.focus(); } }
    else if (event.key === "ArrowLeft" && index > 0) { event.preventDefault(); inputs.current[index - 1]?.focus(); }
    else if (event.key === "ArrowRight" && index < length - 1) { event.preventDefault(); inputs.current[index + 1]?.focus(); }
  };
  const paste = (event: ClipboardEvent<HTMLInputElement>) => { event.preventDefault(); const next = clean(event.clipboardData.getData("text")); update(next); inputs.current[Math.min(next.length, length - 1)]?.focus(); };
  const resolvedLabel = label ?? messages.verificationCode;
  return <fieldset className={cn("min-w-0", className)} disabled={disabled} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? `${id}-error` : undefined}><legend className="cb-label">{resolvedLabel}</legend><input type="hidden" name={name} value={value} /><div className="flex gap-2" onPaste={paste}>{Array.from({ length }).map((_, index) => <input key={index} ref={(node) => { inputs.current[index] = node; }} id={`${id}-${index}`} aria-label={messages.codeCharacter(index + 1)} inputMode={mode === "numeric" ? "numeric" : "text"} autoComplete={index === 0 ? "one-time-code" : "off"} maxLength={1} value={value[index] ?? ""} disabled={disabled} onChange={(event) => setAt(index, event.target.value)} onKeyDown={(event) => keydown(index, event)} onFocus={(event) => event.currentTarget.select()} className={cn("cb-focus h-12 min-w-0 flex-1 rounded-cb-sm border border-border bg-surface text-center text-lg font-semibold text-text-strong outline-none", errorMessage && "border-danger bg-danger-soft", disabled && "border-disabled-border bg-disabled-surface text-disabled-text")} />)}</div>{errorMessage && <span id={`${id}-error`} className="mt-1.5 block text-xs text-danger">{errorMessage}</span>}</fieldset>;
}
