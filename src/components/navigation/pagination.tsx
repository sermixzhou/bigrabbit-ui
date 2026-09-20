import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  compact?: boolean;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
  className?: string;
}

function pageItems(page: number, total: number, siblings: number, boundaries: number): Array<number | "ellipsis"> {
  const keep = new Set<number>();
  for (let index = 1; index <= Math.min(boundaries, total); index++) keep.add(index);
  for (let index = Math.max(1, total - boundaries + 1); index <= total; index++) keep.add(index);
  for (let index = Math.max(1, page - siblings); index <= Math.min(total, page + siblings); index++) keep.add(index);
  const sorted = [...keep].sort((a, b) => a - b);
  const result: Array<number | "ellipsis"> = [];
  sorted.forEach((item, index) => { if (index && item - sorted[index - 1] > 1) result.push("ellipsis"); result.push(item); });
  return result;
}

export function Pagination({ page, totalPages, onChange, siblingCount = 1, boundaryCount = 1, disabled, compact = false, previousLabel, nextLabel, ariaLabel, className }: PaginationProps) {
  const messages = useChattyBunnyMessages();
  const current = Math.min(Math.max(1, page), Math.max(1, totalPages));
  const buttonClass = "cb-focus flex size-11 items-center justify-center rounded-cb-sm border border-transparent text-sm font-semibold text-text-muted hover:bg-primary-subtle hover:text-primary disabled:text-disabled-text";
  return <nav aria-label={ariaLabel ?? messages.pagination} className={cn("flex items-center justify-center gap-1", className)}><button type="button" className={buttonClass} disabled={disabled || current <= 1} aria-label={previousLabel ?? messages.previousPage} onClick={() => onChange?.(current - 1)}>‹</button><div className={cn("flex items-center gap-1", compact && "hidden sm:flex")}>{pageItems(current, totalPages, siblingCount, boundaryCount).map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`} className="flex size-9 items-center justify-center text-text-subtle">…</span> : <button key={item} type="button" disabled={disabled} aria-label={messages.pageLabel(item)} aria-current={item === current ? "page" : undefined} onClick={() => onChange?.(item)} className={cn(buttonClass, item === current && "border-primary bg-primary text-on-primary hover:bg-primary-hover hover:text-on-primary")}>{item}</button>)}</div>{compact && <span className="px-2 text-sm font-medium text-text-muted sm:hidden">{current} / {totalPages}</span>}<button type="button" className={buttonClass} disabled={disabled || current >= totalPages} aria-label={nextLabel ?? messages.nextPage} onClick={() => onChange?.(current + 1)}>›</button></nav>;
}
