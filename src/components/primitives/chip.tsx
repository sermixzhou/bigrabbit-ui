import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { semanticStyles, type Semantic } from "./semantic";

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  selected?: boolean;
  variant?: Exclude<Semantic, "error">;
  icon?: IconName;
  onSelectedChange?: (selected: boolean) => void;
}

export function Chip({ selected, variant = "neutral", icon, onSelectedChange, className, children, ...props }: ChipProps) {
  return <button aria-pressed={selected} className={cn("cb-control inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium", semanticStyles[variant], selected && "!border-brand !bg-brand !text-white", className)} {...props} onClick={(event) => { props.onClick?.(event); onSelectedChange?.(!selected); }}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}
