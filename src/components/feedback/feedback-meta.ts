import type { IconName } from "../icon";
import type { Semantic } from "../primitives";

export const feedbackMeta: Record<Semantic, { icon: IconName; surface: string; text: string }> = {
  neutral: { icon: "info", surface: "border-border bg-surface", text: "text-text-muted" },
  info: { icon: "info", surface: "border-primary-border bg-primary-subtle", text: "text-primary" },
  success: { icon: "check", surface: "border-success-border bg-success-soft", text: "text-success" },
  warning: { icon: "warning", surface: "border-warning-border bg-warning-soft", text: "text-warning-text" },
  error: { icon: "error", surface: "border-danger-border bg-danger-soft", text: "text-danger" },
};
