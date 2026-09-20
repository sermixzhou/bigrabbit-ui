import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export type QuizState = "default" | "selected" | "correct" | "incorrect" | "disabled";

export function QuizOption({ prefix, label, description, state = "default", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { prefix?: string; label: string; description?: string; state?: QuizState }) {
  const disabled = state === "disabled" || state === "correct" || state === "incorrect";
  return <button className={cn("cb-control flex min-h-16 w-full items-center gap-3 rounded-cb-sm border border-border bg-surface px-4 py-3 text-left active:scale-[.99]", state === "selected" && "border-primary bg-primary-subtle", state === "correct" && "border-success bg-success-soft", state === "incorrect" && "border-danger bg-danger-soft", state === "disabled" && "bg-disabled-surface text-disabled-text", className)} disabled={disabled} {...props}>{prefix && <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border border-primary-border text-sm font-semibold text-text-strong", state === "selected" && "border-primary bg-primary text-on-primary", state === "correct" && "border-success bg-success text-on-primary", state === "incorrect" && "border-danger bg-danger text-on-primary")}>{prefix}</span>}<span className="min-w-0 flex-1"><span className="block font-medium">{label}</span>{description && <span className="mt-0.5 block text-xs text-text-muted">{description}</span>}</span>{state !== "default" && state !== "disabled" && <span className={cn("flex items-center gap-1 text-xs font-semibold", state === "correct" ? "text-success" : state === "incorrect" ? "text-danger" : "text-primary")}><Icon name={state === "incorrect" ? "error" : "check"} size={20} />{state === "correct" ? "正确" : state === "incorrect" ? "错误" : "已选"}</span>}</button>;
}
