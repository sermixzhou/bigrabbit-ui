import type { MouseEvent, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon, type IconName } from "../icon";

export interface ActionCardProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: IconName;
  media?: ReactNode;
  badge?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
}

export function ActionCard({ title, description, icon, media, badge, trailing, href, onClick, disabled, selected, className }: ActionCardProps) {
  const classes = cn("cb-focus flex min-h-20 w-full items-center gap-4 rounded-cb border border-border bg-surface p-4 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-primary-border hover:bg-primary-subtle hover:shadow-floating active:translate-y-0", selected && "border-primary bg-primary-soft ring-2 ring-primary-border", disabled && "cursor-not-allowed border-disabled-border bg-disabled-surface text-disabled-text opacity-70 hover:translate-y-0 hover:shadow-soft", className);
  const content = <>{(media || icon) && <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-cb-sm bg-primary-subtle text-primary">{media ?? <Icon name={icon!} size={20} />}</span>}<span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><strong className="text-base text-text-strong">{title}</strong>{badge && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-semibold text-primary">{badge}</span>}</span>{description && <span className="mt-1 block text-sm leading-relaxed text-text-muted">{description}</span>}</span>{trailing ?? <Icon name="arrow-right" size={20} className="text-text-subtle" />}</>;
  if (href) return <a href={disabled ? undefined : href} aria-disabled={disabled || undefined} onClick={(event) => { if (disabled) event.preventDefault(); onClick?.(event); }} className={classes}>{content}</a>;
  if (onClick) return <button type="button" disabled={disabled} onClick={onClick} className={classes}>{content}</button>;
  return <article className={classes}>{content}</article>;
}
