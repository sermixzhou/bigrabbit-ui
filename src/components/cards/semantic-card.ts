import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface SemanticCardProps extends ButtonHTMLAttributes<HTMLButtonElement> { state?: "default" | "current" | "completed" | "locked" | "disabled"; }

export function cardState(state: SemanticCardProps["state"]) {
  return cn(state === "current" && "border-brand bg-[#F2F7FF]", state === "completed" && "border-success bg-[#ECFDF3]", (state === "locked" || state === "disabled") && "border-[#D4DBE6] bg-[#F5F7FA] text-[#8A96A8]");
}
