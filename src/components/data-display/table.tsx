import { createContext, useContext, type HTMLAttributes, type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const DensityContext = createContext<"default" | "compact">("default");

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  density?: "default" | "compact";
  striped?: boolean;
  hover?: boolean;
  wrapperClassName?: string;
}

export function Table({ density = "default", striped = false, hover = true, wrapperClassName, className, children, ...props }: TableProps) {
  return <DensityContext.Provider value={density}><div className={cn("cb-scrollbar w-full overflow-x-auto rounded-cb border border-border bg-surface", wrapperClassName)}><table {...props} className={cn("w-full border-collapse text-left text-sm", striped && "[&>tbody>tr:nth-child(even)]:bg-surface-soft", hover && "[&>tbody>tr:hover]:bg-primary-subtle", className)}>{children}</table></div></DensityContext.Provider>;
}

export function TableCaption({ className, ...props }: HTMLAttributes<HTMLTableCaptionElement>) { return <caption {...props} className={cn("px-4 py-3 text-left text-sm text-text-muted", className)} />; }
export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) { return <thead {...props} className={cn("border-b border-border bg-surface-soft", className)} />; }
export function TableBody({ className, children, emptyContent, emptyColSpan = 100, ...props }: HTMLAttributes<HTMLTableSectionElement> & { emptyContent?: ReactNode; emptyColSpan?: number }) { return <tbody {...props} className={className}>{children || (emptyContent && <tr><td colSpan={emptyColSpan} className="px-4 py-10 text-center text-sm text-text-muted">{emptyContent}</td></tr>)}</tbody>; }
export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) { return <tr {...props} className={cn("border-b border-border transition-colors last:border-0", className)} />; }
export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) { const density = useContext(DensityContext); return <th {...props} scope={props.scope ?? "col"} className={cn("font-semibold text-text-strong", density === "compact" ? "px-3 py-2" : "px-4 py-3", className)} />; }
export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) { const density = useContext(DensityContext); return <td {...props} className={cn("text-text-muted", density === "compact" ? "px-3 py-2" : "px-4 py-3", className)} />; }
