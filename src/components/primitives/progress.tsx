import { cn } from "../../lib/cn";

export interface ProgressProps { value: number; max?: number; size?: "standard" | "slim"; state?: "default" | "success" | "error"; label?: string; showValue?: boolean; className?: string; }

export function Progress({ value, max = 100, size = "standard", state = "default", label, showValue = false, className }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = state === "success" ? "bg-success" : state === "error" ? "bg-danger" : "bg-brand";
  return <div className={cn("w-full", className)}>{(label || showValue) && <div className="mb-2 flex items-center justify-between text-xs text-muted"><span>{label}</span>{showValue && <span>{Math.round(percent)}%</span>}</div>}<div className={cn("overflow-hidden rounded-full bg-[#E6F1FF]", size === "slim" ? "h-1" : "h-2")} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}><div className={cn("h-full rounded-full transition-[width] duration-300", fill)} style={{ width: `${percent}%` }} /></div></div>;
}
