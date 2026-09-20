import { cn } from "../../lib/cn";
import { Mascot, type MascotState } from "./mascot";

export function MascotCallout({ message, supportingText, state = "encourage", placement = "left" }: { message: string; supportingText?: string; state?: MascotState; placement?: "left" | "right" }) {
  return <div className={cn("flex items-center gap-3", placement === "right" && "flex-row-reverse")}><Mascot state={state} size="medium" /><div className={cn("relative flex-1 rounded-cb bg-[#F2F7FF] p-4", placement === "left" ? "before:absolute before:-left-2 before:top-7 before:border-y-8 before:border-r-8 before:border-y-transparent before:border-r-[#F2F7FF]" : "after:absolute after:-right-2 after:top-7 after:border-y-8 after:border-l-8 after:border-y-transparent after:border-l-[#F2F7FF]")}><p className="font-semibold text-brand-deep">{message}</p>{supportingText && <p className="mt-1 text-sm text-muted">{supportingText}</p>}</div></div>;
}
