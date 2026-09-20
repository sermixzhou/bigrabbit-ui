export type Semantic = "neutral" | "info" | "success" | "warning" | "error";

export const semanticStyles: Record<Semantic, string> = {
  neutral: "bg-surface-muted text-text-muted border-border",
  info: "bg-primary-subtle text-primary border-primary-border",
  success: "bg-success-soft text-success border-success-border",
  warning: "bg-warning-soft text-warning-text border-warning-border",
  error: "bg-danger-soft text-danger border-danger-border",
};
