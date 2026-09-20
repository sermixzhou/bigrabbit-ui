import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";
import { semanticStyles, type Semantic } from "./semantic";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Semantic;
  size?: "medium" | "small";
  icon?: IconName;
}

export function Tag({ variant = "neutral", size = "medium", icon, className, children, ...props }: TagProps) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full border font-medium", semanticStyles[variant], size === "medium" ? "h-7 px-2.5 text-xs" : "h-6 px-2 text-[11px]", className)} {...props}>{icon && <Icon name={icon} size={16} />}{children}</span>;
}
