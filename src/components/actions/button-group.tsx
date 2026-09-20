import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  attached?: boolean;
}

export function ButtonGroup({ orientation = "horizontal", attached = false, className, children, ...props }: ButtonGroupProps) {
  return <div {...props} role={props.role ?? "group"} className={cn("flex", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap", attached ? "gap-0 [&>*]:rounded-none [&>*:first-child]:rounded-l-cb-md [&>*:last-child]:rounded-r-cb-md [&>*+*]:-ml-px" : "gap-3", orientation === "vertical" && attached && "[&>*:first-child]:rounded-t-cb-md [&>*:first-child]:rounded-bl-none [&>*:last-child]:rounded-b-cb-md [&>*:last-child]:rounded-tr-none [&>*+*]:-mt-px [&>*+*]:ml-0", className)}>{children}</div>;
}
