import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChoiceGroupContext } from "./choice-group-context";

export interface ChoiceCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
  media?: ReactNode;
  badge?: ReactNode;
  trailing?: ReactNode;
  value?: string;
  selected?: boolean;
  selectionMode?: "single" | "multiple";
}

export function ChoiceCard({ title, description, media, badge, trailing, value, selected = false, selectionMode = "single", disabled, className, onClick, tabIndex, ...props }: ChoiceCardProps) {
  const group = useChoiceGroupContext();
  const mode = group?.selectionMode ?? selectionMode;
  const isSelected = group && value !== undefined ? group.selectedValues.includes(value) : selected;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && group && value !== undefined) group.toggle(value);
  };
  return <button {...props} type={props.type ?? "button"} disabled={disabled} data-cb-choice={group ? "" : undefined} role={group ? mode === "single" ? "radio" : "checkbox" : undefined} aria-checked={group ? isSelected : undefined} aria-pressed={group ? undefined : isSelected} tabIndex={group && mode === "single" ? isSelected ? 0 : -1 : tabIndex} onClick={handleClick} className={cn("cb-focus group flex min-h-20 w-full items-center gap-4 rounded-cb border border-border bg-surface p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-primary-border hover:bg-primary-subtle hover:shadow-floating active:translate-y-0", isSelected && "border-primary bg-primary-soft ring-2 ring-primary-border", disabled && "cursor-not-allowed border-disabled-border bg-disabled-surface text-disabled-text opacity-70 hover:translate-y-0 hover:shadow-soft", className)}>{media && <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-cb-sm bg-primary-subtle text-primary">{media}</span>}<span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><strong className={cn("text-base text-text-strong", disabled && "text-disabled-text")}>{title}</strong>{badge && <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-semibold text-primary">{badge}</span>}</span>{description && <span className={cn("mt-1 block text-sm leading-relaxed text-text-muted", disabled && "text-disabled-text")}>{description}</span>}</span>{trailing ?? <span className={cn("flex size-6 shrink-0 items-center justify-center border text-transparent transition", mode === "single" ? "rounded-full" : "rounded-md", isSelected ? "border-primary bg-primary text-on-primary" : "border-border-strong bg-surface", disabled && "border-disabled-border bg-disabled-bg")}>{isSelected && <Icon name="check" size={16} />}</span>}</button>;
}
