import { Button } from "../primitives";

export function OnboardingHint({ step, total, title, description, actionLabel = "下一步", skipLabel = "跳过", onNext, onSkip }: { step: number; total: number; title: string; description: string; actionLabel?: string; skipLabel?: string; onNext?: () => void; onSkip?: () => void }) {
  return <section className="rounded-cb border border-primary-border bg-surface p-4 shadow-floating"><div className="flex items-center justify-between"><span className="cb-eyebrow">{step} / {total}</span><button onClick={onSkip} className="cb-focus min-h-11 rounded-lg px-2 text-sm text-text-muted">{skipLabel}</button></div><h3 className="text-lg font-semibold text-text-strong">{title}</h3><p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p><Button size="medium" className="mt-4" onClick={onNext}>{actionLabel}</Button></section>;
}
