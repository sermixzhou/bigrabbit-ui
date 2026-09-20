import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { Button } from "../primitives";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export function AnswerFeedback({ variant, title, explanation, answer, expected, actionLabel, correctAnswerLabel, onAction }: { variant: "correct" | "incorrect"; title: string; explanation: string; answer?: string; expected?: string; actionLabel?: string; correctAnswerLabel?: string; onAction?: () => void }) {
  const messages = useChattyBunnyMessages();
  const correct = variant === "correct";
  return <section className={cn("rounded-cb border p-5", correct ? "border-success bg-success-soft" : "border-danger bg-danger-soft")}><div className="flex items-start gap-3"><span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-on-primary", correct ? "bg-success" : "bg-danger")}><Icon name={correct ? "check" : "error"} /></span><div><h3 className="text-lg font-semibold text-text-strong">{title}</h3><p className="mt-1 text-sm leading-relaxed text-text-muted">{explanation}</p>{(answer || expected) && <p className="mt-3 text-sm"><span className="font-semibold">{answer}</span>{expected && <span className="text-text-muted"> → {correctAnswerLabel ?? messages.correctAnswer}: {expected}</span>}</p>}</div></div><Button className="mt-4" onClick={onAction}>{actionLabel ?? messages.nextQuestion}</Button></section>;
}
