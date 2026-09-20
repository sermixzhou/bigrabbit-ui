import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { loading?: boolean; onClear?: () => void; }

export function Search({ loading, value, onClear, className, ...props }: SearchProps) {
  const hasValue = String(value ?? "").length > 0;
  return <label className={cn("flex h-12 w-full items-center gap-2 rounded-cb-sm border border-line bg-white px-4 transition focus-within:border-brand focus-within:bg-[#F2F7FF] focus-within:ring-4 focus-within:ring-[rgba(10,124,255,.1)]", props.disabled && "bg-[#F5F7FA]", className)}><Icon name="search" size={20} className="text-[#8A96A8]" /><input type="search" value={value} className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8A96A8]" {...props} />{loading ? <span className="size-4 animate-spin rounded-full border-2 border-brand border-r-transparent" /> : hasValue && !props.disabled ? <button type="button" aria-label="清空搜索" className="cb-focus -mr-2 flex size-10 items-center justify-center rounded-full text-[#8A96A8]" onClick={onClear}><Icon name="close" size={20} /></button> : null}</label>;
}
