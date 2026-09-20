import { StepIndicator, type StepItem } from "../primitives";

export function StudyProgress({ items, current, title }: { items: StepItem[]; current: number; title?: string }) {
  return <section className="rounded-cb border border-border bg-surface p-4">{title && <h3 className="mb-4 font-semibold text-text-strong">{title}</h3>}<StepIndicator items={items} current={current} /></section>;
}
