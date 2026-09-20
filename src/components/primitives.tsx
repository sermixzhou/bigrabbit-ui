import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "./Icon";

export type Semantic = "neutral" | "info" | "success" | "warning" | "error";

const semanticStyles: Record<Semantic, string> = {
  neutral: "bg-[#F5F7FA] text-[#68758A] border-[#E5EAF2]",
  info: "bg-[#F2F7FF] text-brand border-[#CFE4FF]",
  success: "bg-[#ECFDF3] text-success border-[#BBF7D0]",
  warning: "bg-[#FFF8E6] text-[#B86900] border-[#FDE7AA]",
  error: "bg-[#FFF1F0] text-danger border-[#FFD0CC]",
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "large" | "medium";
  loading?: boolean;
  icon?: IconName;
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "large",
  loading = false,
  icon,
  block = true,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "br-control inline-flex items-center justify-center gap-2 rounded-br-md border px-5 text-[17px] font-semibold active:scale-[.98]",
        size === "large" ? "h-12" : "h-11",
        variant === "primary" && "border-transparent bg-brand text-white hover:bg-brand-hover active:bg-brand-pressed",
        variant === "secondary" && "border-[#CFE4FF] bg-[#F2F7FF] text-brand hover:bg-[#E6F1FF]",
        variant === "ghost" && "border-transparent bg-transparent text-brand hover:bg-[#E6F1FF]",
        block ? "w-full" : "w-auto",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" /> : icon ? <Icon name={icon} size={20} /> : null}
      <span>{loading ? "加载中" : children}</span>
    </button>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  variant?: "plain" | "soft" | "outlined";
  selected?: boolean;
  iconSize?: 16 | 20 | 24 | 32;
}

export function IconButton({ icon, label, variant = "plain", selected, iconSize = 24, className, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "br-control inline-flex size-11 shrink-0 items-center justify-center rounded-full border active:scale-[.96]",
        variant === "plain" && "border-transparent bg-transparent hover:bg-[#F2F7FF]",
        variant === "soft" && "border-transparent bg-[#F2F7FF] text-brand hover:bg-[#E6F1FF]",
        variant === "outlined" && "border-line bg-white hover:border-[#CFE4FF] hover:bg-[#F2F7FF]",
        selected && "!border-[#CFE4FF] !bg-[#E6F1FF] !text-brand",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={iconSize} />
    </button>
  );
}

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  selected?: boolean;
  variant?: Exclude<Semantic, "error">;
  icon?: IconName;
  onSelectedChange?: (selected: boolean) => void;
}

export function Chip({ selected, variant = "neutral", icon, onSelectedChange, className, children, ...props }: ChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={cn(
        "br-control inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium",
        semanticStyles[variant],
        selected && "!border-brand !bg-brand !text-white",
        className,
      )}
      {...props}
      onClick={(event) => { props.onClick?.(event); onSelectedChange?.(!selected); }}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Semantic;
  size?: "medium" | "small";
  icon?: IconName;
}

export function Tag({ variant = "neutral", size = "medium", icon, className, children, ...props }: TagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border font-medium", semanticStyles[variant], size === "medium" ? "h-7 px-2.5 text-xs" : "h-6 px-2 text-[11px]", className)} {...props}>
      {icon && <Icon name={icon} size={16} />}{children}
    </span>
  );
}

export function Badge({ children, variant = "info", dot = false, className }: { children?: ReactNode; variant?: Semantic; dot?: boolean; className?: string }) {
  if (dot) return <span aria-label={String(children ?? "状态提示")} className={cn("inline-block size-2.5 rounded-full", variant === "error" ? "bg-danger" : variant === "success" ? "bg-success" : variant === "warning" ? "bg-warning" : "bg-brand", className)} />;
  return <span className={cn("inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold", semanticStyles[variant], className)}>{children}</span>;
}

export interface ProgressProps { value: number; max?: number; size?: "standard" | "slim"; state?: "default" | "success" | "error"; label?: string; showValue?: boolean; className?: string; }

export function Progress({ value, max = 100, size = "standard", state = "default", label, showValue = false, className }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = state === "success" ? "bg-success" : state === "error" ? "bg-danger" : "bg-brand";
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && <div className="mb-2 flex items-center justify-between text-xs text-muted"><span>{label}</span>{showValue && <span>{Math.round(percent)}%</span>}</div>}
      <div className={cn("overflow-hidden rounded-full bg-[#E6F1FF]", size === "slim" ? "h-1" : "h-2")} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <div className={cn("h-full rounded-full transition-[width] duration-300", fill)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export interface StepItem { label: string; value?: string; }

export function StepIndicator({ items, current = 0, className }: { items: StepItem[]; current?: number; className?: string }) {
  return (
    <ol className={cn("flex w-full", className)} aria-label="步骤进度">
      {items.map((item, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={item.value ?? item.label} className="relative flex flex-1 flex-col items-center text-center last:flex-none">
            {index < items.length - 1 && <span className={cn("absolute left-1/2 right-[-50%] top-3 h-px", index < current ? "bg-brand" : "bg-[#D4DBE6]")} />}
            <span className={cn("relative z-10 flex size-6 items-center justify-center rounded-full border text-xs font-semibold", done && "border-brand bg-brand text-white", active && "border-brand bg-[#E6F1FF] text-brand", !done && !active && "border-[#D4DBE6] bg-white text-[#8A96A8]")}>{done ? <Icon name="check" size={16} /> : index + 1}</span>
            <span className={cn("mt-2 max-w-16 text-xs", active || done ? "font-semibold text-brand-deep" : "text-[#8A96A8]")}>{item.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
