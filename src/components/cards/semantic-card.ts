import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SemanticCardProps extends ButtonHTMLAttributes<HTMLButtonElement> { state?: "default" | "current" | "completed" | "locked" | "disabled"; }

export function cardState(state: SemanticCardProps["state"]) {
  return cn(state === "current" && "border-primary bg-primary-subtle", state === "completed" && "border-success bg-success-soft", (state === "locked" || state === "disabled") && "border-disabled-border bg-disabled-surface text-disabled-text");
}
