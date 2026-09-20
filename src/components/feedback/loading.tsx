import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export function Loading({ label, size = "medium", fullScreen = false }: { label?: string; size?: "small" | "medium" | "large"; fullScreen?: boolean }) {
  const messages = useChattyBunnyMessages();
  return <div role="status" className={cn("flex items-center justify-center gap-3", fullScreen && "fixed inset-0 z-50 bg-surface/90")}><span className={cn("animate-spin rounded-full border-[3px] border-primary-border border-t-primary", size === "small" && "size-5", size === "medium" && "size-8", size === "large" && "size-12")} /><span className="text-sm font-medium text-text-muted">{label ?? messages.loading}</span></div>;
}
