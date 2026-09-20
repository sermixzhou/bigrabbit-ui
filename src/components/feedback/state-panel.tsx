import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Mascot, type MascotState } from "../brand";
import { Icon, type IconName } from "../icon";
import { Button } from "../primitives";

export interface StatePanelProps { icon?: IconName; mascot?: MascotState; title: string; description: string; actionLabel?: string; secondaryLabel?: string; onAction?: () => void; onSecondary?: () => void; className?: string; children?: ReactNode; }

export function StatePanel({ icon, mascot, title, description, actionLabel, secondaryLabel, onAction, onSecondary, className, children }: StatePanelProps) {
  return <section className={cn("flex w-full flex-col items-center rounded-cb border border-border bg-surface p-5 text-center", className)}>{mascot ? <Mascot state={mascot} size="large" /> : <span className="flex size-20 items-center justify-center rounded-full bg-primary-subtle text-primary"><Icon name={icon ?? "info"} size={32} /></span>}<h3 className="mt-4 text-xl font-bold text-text-strong">{title}</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">{description}</p>{children}{actionLabel && <Button className="mt-5 max-w-xs" onClick={onAction}>{actionLabel}</Button>}{secondaryLabel && <Button variant="ghost" size="medium" className="mt-1 max-w-xs" onClick={onSecondary}>{secondaryLabel}</Button>}</section>;
}
