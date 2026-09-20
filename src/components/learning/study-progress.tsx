import { StepIndicator, type StepItem } from "../primitives";

export function StudyProgress({ items, current, title }: { items: StepItem[]; current: number; title?: string }) {
  return <section className="rounded-cb border border-line bg-white p-4">{title && <h3 className="mb-4 font-semibold text-brand-deep">{title}</h3>}<StepIndicator items={items} current={current} /></section>;
}
