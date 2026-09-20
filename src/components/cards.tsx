import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Icon, type IconName } from "./Icon";
import { Progress, Tag } from "./primitives";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant?: "default" | "soft";
  padding?: "standard" | "large";
  shadow?: "none" | "soft" | "floating";
  state?: "default" | "selected" | "disabled";
  footer?: ReactNode;
}

export function Card({ title, description, variant = "default", padding = "standard", shadow = "none", state = "default", footer, className, children, ...props }: CardProps) {
  return <div className={cn("rounded-br border bg-white text-left transition", padding === "large" ? "p-5" : "p-4", variant === "soft" && "border-[#CFE4FF] bg-[#F2F7FF]", state === "default" && variant === "default" && "border-line", state === "selected" && "!border-brand !bg-[#F2F7FF]", state === "disabled" && "!border-[#D4DBE6] !bg-[#F5F7FA] !text-[#8A96A8]", shadow === "soft" && "shadow-soft", shadow === "floating" && "shadow-floating", className)} {...props}>
    {title && <h3 className="text-[17px] font-semibold leading-[1.4] text-brand-deep">{title}</h3>}
    {description && <p className="mt-1 text-sm leading-[1.45] text-muted">{description}</p>}
    {children && <div className={cn((title || description) && "mt-4")}>{children}</div>}
    {footer && <div className="mt-4">{footer}</div>}
  </div>;
}

interface SemanticCardProps extends ButtonHTMLAttributes<HTMLButtonElement> { state?: "default" | "current" | "completed" | "locked" | "disabled"; }

function cardState(state: SemanticCardProps["state"]) {
  return cn(state === "current" && "border-brand bg-[#F2F7FF]", state === "completed" && "border-success bg-[#ECFDF3]", (state === "locked" || state === "disabled") && "border-[#D4DBE6] bg-[#F5F7FA] text-[#8A96A8]");
}

export function LearningProgressCard({ title, subtitle, value, max = 100, icon = "book", state = "default", ...props }: SemanticCardProps & { title: string; subtitle: string; value: number; max?: number; icon?: IconName }) {
  return <button className={cn("br-control br-card w-full active:scale-[.99]", cardState(state))} disabled={state === "disabled"} {...props}><div className="flex items-center gap-3"><span className="flex size-12 shrink-0 items-center justify-center rounded-br-md bg-[#E6F1FF] text-brand"><Icon name={state === "completed" ? "check" : icon} /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-brand-deep">{title}</span><span className="mt-0.5 block text-sm text-muted">{subtitle}</span></span><Icon name="arrow-right" size={20} className="text-[#8A96A8]" /></div><Progress className="mt-4" value={value} max={max} state={state === "completed" ? "success" : "default"} showValue /></button>;
}

export function UnitCard({ unit, title, description, progress, state = "default", icon = "book", ...props }: SemanticCardProps & { unit: string; title: string; description: string; progress: number; icon?: IconName }) {
  const disabled = state === "locked" || state === "disabled";
  return <button className={cn("br-control br-card block w-full active:scale-[.99]", cardState(state))} disabled={disabled} {...props}><span className="flex w-full items-center gap-3"><span className={cn("flex size-12 shrink-0 items-center justify-center rounded-br-md bg-[#E6F1FF] text-brand", disabled && "bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={state === "locked" ? "lock" : icon} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-brand">{unit}</span><span className="block text-[17px] font-semibold text-brand-deep">{title}</span><span className="mt-0.5 block text-sm text-muted">{description}</span></span><span className={cn("flex shrink-0 flex-col items-center gap-1 text-xs font-semibold text-brand", state === "completed" && "text-success", disabled && "text-[#8A96A8]")}><Icon name={state === "completed" ? "check" : state === "locked" ? "lock" : "arrow-right"} size={20} />{state === "completed" ? "完成" : state === "current" ? "继续" : state === "locked" ? "锁定" : "开始"}</span></span><Progress className="mt-4" value={progress} state={state === "completed" ? "success" : "default"} showValue /></button>;
}

export function WordCard({ word, phonetic, meaning, state = "default", favorite, ...props }: SemanticCardProps & { word: string; phonetic: string; meaning: string; favorite?: boolean }) {
  return <button className={cn("br-control br-card w-full active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className="flex items-start justify-between gap-3"><span className="min-w-0"><span className="block text-2xl font-bold text-brand-deep">{word}</span><span className="mt-1 block text-sm text-muted">{phonetic}</span><span className="mt-3 block text-base">{meaning}</span></span><Icon name={state === "locked" ? "lock" : favorite ? "favorite" : "arrow-right"} className={favorite ? "text-brand" : "text-[#8A96A8]"} /></span></button>;
}

export function ReviewCard({ title, description, count, state = "default", icon = "review", ...props }: SemanticCardProps & { title: string; description: string; count: number; icon?: IconName }) {
  return <button className={cn("br-control br-card w-full active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className="flex items-center gap-3"><span className="flex size-12 items-center justify-center rounded-br-md bg-[#E6F1FF] text-brand"><Icon name={state === "locked" ? "lock" : icon} /></span><span className="min-w-0 flex-1"><span className="block font-semibold text-brand-deep">{title}</span><span className="block text-sm text-muted">{description}</span></span><span className="rounded-full bg-[#F2F7FF] px-2.5 py-1 text-sm font-semibold text-brand">{count}</span></span></button>;
}

export function AchievementCard({ title, description, state = "default", icon = "achievement", ...props }: SemanticCardProps & { title: string; description: string; icon?: IconName }) {
  return <button className={cn("br-control br-card w-full text-center active:scale-[.99]", cardState(state))} disabled={state === "locked" || state === "disabled"} {...props}><span className={cn("mx-auto flex size-14 items-center justify-center rounded-full bg-[#FFF8E6] text-warning", state === "locked" && "bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={state === "locked" ? "lock" : icon} size={32} /></span><span className="mt-3 block font-semibold text-brand-deep">{title}</span><span className="mt-1 block text-sm text-muted">{description}</span></button>;
}

export interface ListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> { leadingIcon?: IconName; title: string; description?: string; trailing?: ReactNode; arrow?: boolean; state?: "default" | "current" | "selected" | "completed" | "locked" | "disabled"; }

export function ListItem({ leadingIcon, title, description, trailing, arrow = true, state = "default", className, ...props }: ListItemProps) {
  const disabled = state === "disabled" || state === "locked";
  return <button className={cn("br-control flex min-h-14 w-full items-center gap-3 border-b border-line bg-white px-4 text-left last:border-b-0 hover:bg-[#FAFBFC]", (state === "selected" || state === "current") && "bg-[#F2F7FF]", disabled && "bg-[#F5F7FA] text-[#8A96A8]", className)} disabled={disabled} {...props}>{leadingIcon && <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-br-sm bg-[#F2F7FF] text-brand", disabled && "bg-[#E5EAF2] text-[#8A96A8]")}><Icon name={state === "locked" ? "lock" : state === "completed" ? "check" : leadingIcon} size={20} /></span>}<span className="min-w-0 flex-1"><span className="block truncate font-medium text-brand-deep">{title}</span>{description && <span className="block truncate text-sm text-muted">{description}</span>}</span>{trailing && <span className="shrink-0 text-sm text-muted">{trailing}</span>}{arrow && <Icon name="arrow-right" size={20} className="text-[#8A96A8]" />}</button>;
}

export function WordListItem({ index, word, meaning, state = "default", status, ...props }: Omit<ListItemProps, "title" | "description" | "leadingIcon"> & { index: number; word: string; meaning: string; status?: string }) {
  return <ListItem leadingIcon={state === "completed" ? "check" : state === "locked" ? "lock" : "book"} title={word} description={meaning} trailing={status ?? String(index).padStart(2, "0")} state={state} {...props} />;
}

export function SettingListItem({ icon, title, description, value, ...props }: Omit<ListItemProps, "leadingIcon" | "trailing"> & { icon: IconName; value?: string }) {
  return <ListItem leadingIcon={icon} title={title} description={description} trailing={value} {...props} />;
}

export function StatusTag({ state }: { state: NonNullable<SemanticCardProps["state"]> }) {
  const labels = { default: "未开始", current: "进行中", completed: "已完成", locked: "未解锁", disabled: "不可用" };
  return <Tag variant={state === "completed" ? "success" : state === "current" ? "info" : "neutral"}>{labels[state]}</Tag>;
}
