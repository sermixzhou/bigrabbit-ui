import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> { loading?: boolean; clearLabel?: string; onClear?: () => void; }

export function Search({ loading, value, clearLabel, onClear, className, ...props }: SearchProps) {
  const messages = useChattyBunnyMessages();
  const hasValue = String(value ?? "").length > 0;
  return <label className={cn("flex h-12 w-full items-center gap-2 rounded-cb-sm border border-border bg-surface px-4 transition focus-within:border-primary focus-within:bg-primary-subtle focus-within:ring-4 focus-within:ring-focus-ring-soft", props.disabled && "bg-disabled-surface", className)}><Icon name="search" size={20} className="text-text-subtle" /><input type="search" value={value} className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-subtle disabled:text-disabled-text" {...props} />{loading ? <span className="size-4 animate-spin rounded-full border-2 border-primary border-r-transparent" /> : hasValue && !props.disabled ? <button type="button" aria-label={clearLabel ?? messages.clearSearch} className="cb-focus -mr-2 flex size-10 items-center justify-center rounded-full text-text-subtle" onClick={onClear}><Icon name="close" size={20} /></button> : null}</label>;
}
