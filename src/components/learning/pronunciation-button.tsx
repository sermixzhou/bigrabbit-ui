import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export type PronunciationState = "ready" | "recording" | "processing" | "success" | "retry" | "disabled";

export function PronunciationButton({ state = "ready", label, className, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & { state?: PronunciationState; label?: string }) {
  const messages = useChattyBunnyMessages();
  const labels = { ready: messages.pronunciationReady, recording: messages.pronunciationRecording, processing: messages.pronunciationProcessing, success: messages.pronunciationSuccess, retry: messages.pronunciationRetry, disabled: messages.unavailable };
  const icon = state === "success" ? "check" : state === "retry" ? "refresh" : "microphone";
  return <button className={cn("cb-focus flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-primary text-xs font-semibold text-on-primary transition active:scale-[.98] disabled:cursor-not-allowed", state === "recording" && "animate-pulse-soft bg-danger", state === "processing" && "bg-text-muted", state === "success" && "bg-success", state === "retry" && "bg-warning", state === "disabled" && "bg-disabled-emphasis-bg text-disabled-text", className)} disabled={state === "processing" || state === "disabled"} {...props}>{state === "processing" ? <span className="size-6 animate-spin rounded-full border-2 border-current border-r-transparent" /> : <Icon name={icon} size={32} />}<span>{label ?? labels[state]}</span></button>;
}
