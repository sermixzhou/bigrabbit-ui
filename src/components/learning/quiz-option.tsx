import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export type QuizState = "default" | "selected" | "correct" | "incorrect" | "disabled";

export function QuizOption({ prefix, label, description, state = "default", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { prefix?: string; label: string; description?: string; state?: QuizState }) {
  const disabled = state === "disabled" || state === "correct" || state === "incorrect";
  return <button className={cn("cb-control flex min-h-16 w-full items-center gap-3 rounded-cb-sm border border-line bg-white px-4 py-3 text-left active:scale-[.99]", state === "selected" && "border-brand bg-[#F2F7FF]", state === "correct" && "border-success bg-[#ECFDF3]", state === "incorrect" && "border-danger bg-[#FFF1F0]", state === "disabled" && "bg-[#F5F7FA]", className)} disabled={disabled} {...props}>{prefix && <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border border-[#CFE4FF] text-sm font-semibold text-brand-deep", state === "selected" && "border-brand bg-brand text-white", state === "correct" && "border-success bg-success text-white", state === "incorrect" && "border-danger bg-danger text-white")}>{prefix}</span>}<span className="min-w-0 flex-1"><span className="block font-medium">{label}</span>{description && <span className="mt-0.5 block text-xs text-muted">{description}</span>}</span>{state !== "default" && state !== "disabled" && <span className={cn("flex items-center gap-1 text-xs font-semibold", state === "correct" ? "text-success" : state === "incorrect" ? "text-danger" : "text-brand")}><Icon name={state === "incorrect" ? "error" : "check"} size={20} />{state === "correct" ? "正确" : state === "incorrect" ? "错误" : "已选"}</span>}</button>;
}
