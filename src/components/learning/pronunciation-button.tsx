import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export type PronunciationState = "ready" | "recording" | "processing" | "success" | "retry" | "disabled";

export function PronunciationButton({ state = "ready", label, className, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & { state?: PronunciationState; label?: string }) {
  const labels = { ready: "按住朗读", recording: "录音中", processing: "处理中", success: "发音正确", retry: "再试一次", disabled: "不可用" };
  const icon = state === "success" ? "check" : state === "retry" ? "refresh" : "microphone";
  return <button className={cn("cb-focus flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-brand text-xs font-semibold text-white transition active:scale-[.98] disabled:cursor-not-allowed", state === "recording" && "animate-pulse-soft bg-danger", state === "processing" && "bg-muted", state === "success" && "bg-success", state === "retry" && "bg-warning", state === "disabled" && "bg-[#D4DBE6] text-[#8A96A8]", className)} disabled={state === "processing" || state === "disabled"} {...props}>{state === "processing" ? <span className="size-6 animate-spin rounded-full border-2 border-current border-r-transparent" /> : <Icon name={icon} size={32} />}<span>{label ?? labels[state]}</span></button>;
}
