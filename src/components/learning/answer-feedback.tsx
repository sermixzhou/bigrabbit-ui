import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { Button } from "../primitives";

export function AnswerFeedback({ variant, title, explanation, answer, expected, actionLabel = "下一题", onAction }: { variant: "correct" | "incorrect"; title: string; explanation: string; answer?: string; expected?: string; actionLabel?: string; onAction?: () => void }) {
  const correct = variant === "correct";
  return <section className={cn("rounded-cb border p-5", correct ? "border-success bg-[#ECFDF3]" : "border-danger bg-[#FFF1F0]")}><div className="flex items-start gap-3"><span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-white", correct ? "bg-success" : "bg-danger")}><Icon name={correct ? "check" : "error"} /></span><div><h3 className="text-lg font-semibold text-brand-deep">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{explanation}</p>{(answer || expected) && <p className="mt-3 text-sm"><span className="font-semibold">{answer}</span>{expected && <span className="text-muted"> → 正确答案：{expected}</span>}</p>}</div></div><Button className="mt-4" onClick={onAction}>{actionLabel}</Button></section>;
}
