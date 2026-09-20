import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Icon } from "./Icon";
import { Button, IconButton, StepIndicator, type StepItem } from "./primitives";

export type QuizState = "default" | "selected" | "correct" | "incorrect" | "disabled";

export function QuizOption({ prefix, label, description, state = "default", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { prefix?: string; label: string; description?: string; state?: QuizState }) {
  const disabled = state === "disabled" || state === "correct" || state === "incorrect";
  return <button className={cn("cb-control flex min-h-16 w-full items-center gap-3 rounded-cb-sm border border-line bg-white px-4 py-3 text-left active:scale-[.99]", state === "selected" && "border-brand bg-[#F2F7FF]", state === "correct" && "border-success bg-[#ECFDF3]", state === "incorrect" && "border-danger bg-[#FFF1F0]", state === "disabled" && "bg-[#F5F7FA]", className)} disabled={disabled} {...props}>{prefix && <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full border border-[#CFE4FF] text-sm font-semibold text-brand-deep", state === "selected" && "border-brand bg-brand text-white", state === "correct" && "border-success bg-success text-white", state === "incorrect" && "border-danger bg-danger text-white")}>{prefix}</span>}<span className="min-w-0 flex-1"><span className="block font-medium">{label}</span>{description && <span className="mt-0.5 block text-xs text-muted">{description}</span>}</span>{state !== "default" && state !== "disabled" && <span className={cn("flex items-center gap-1 text-xs font-semibold", state === "correct" ? "text-success" : state === "incorrect" ? "text-danger" : "text-brand")}><Icon name={state === "incorrect" ? "error" : "check"} size={20} />{state === "correct" ? "正确" : state === "incorrect" ? "错误" : "已选"}</span>}</button>;
}

export function AudioButton({ label = "发音", playing, size = "medium", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label?: string; playing?: boolean; size?: "small" | "medium" }) {
  return <button aria-label={playing ? `${label}，播放中` : label} className={cn("cb-control inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#CFE4FF] bg-[#F2F7FF] font-semibold text-brand active:scale-[.96]", size === "small" ? "size-11" : "h-11 px-4", playing && "animate-pulse-soft bg-brand text-white", className)} {...props}><Icon name={playing ? "pause" : "audio"} size={20} />{size === "medium" && <span>{playing ? "播放中" : label}</span>}</button>;
}

export type PronunciationState = "ready" | "recording" | "processing" | "success" | "retry" | "disabled";

export function PronunciationButton({ state = "ready", label, className, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> & { state?: PronunciationState; label?: string }) {
  const labels = { ready: "按住朗读", recording: "录音中", processing: "处理中", success: "发音正确", retry: "再试一次", disabled: "不可用" };
  const icon = state === "success" ? "check" : state === "retry" ? "refresh" : "microphone";
  return <button className={cn("cb-focus flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-brand text-xs font-semibold text-white transition active:scale-[.98] disabled:cursor-not-allowed", state === "recording" && "animate-pulse-soft bg-danger", state === "processing" && "bg-muted", state === "success" && "bg-success", state === "retry" && "bg-warning", state === "disabled" && "bg-[#D4DBE6] text-[#8A96A8]", className)} disabled={state === "processing" || state === "disabled"} {...props}>{state === "processing" ? <span className="size-6 animate-spin rounded-full border-2 border-current border-r-transparent" /> : <Icon name={icon} size={32} />}<span>{label ?? labels[state]}</span></button>;
}

export function WordHeader({ word, phonetic, meaning, playing, favorite, onAudio, onFavorite, disabled }: { word: string; phonetic: string; meaning: string; playing?: boolean; favorite?: boolean; onAudio?: () => void; onFavorite?: () => void; disabled?: boolean }) {
  return <section className={cn("rounded-cb border border-line bg-white p-5", disabled && "bg-[#F5F7FA] text-[#8A96A8]")}><div className="flex items-start justify-between gap-3"><div><h3 className="break-all font-sans text-4xl font-bold leading-tight text-brand-deep">{word}</h3><p className="mt-1 text-[15px] text-muted">{phonetic}</p></div><IconButton icon="favorite" label={favorite ? "取消收藏" : "收藏"} selected={favorite} disabled={disabled} onClick={onFavorite} /></div><div className="mt-5 flex items-center justify-between gap-3"><p className="text-[17px]">{meaning}</p><AudioButton playing={playing} disabled={disabled} onClick={onAudio} /></div></section>;
}

export function ExampleSentence({ sentence, translation, playing, onAudio, disabled }: { sentence: string; translation: string; playing?: boolean; onAudio?: () => void; disabled?: boolean }) {
  return <div className={cn("rounded-cb border border-line bg-white p-4", disabled && "bg-[#F5F7FA] text-[#8A96A8]")}><div className="flex items-start gap-3"><div className="min-w-0 flex-1"><p className="font-medium leading-relaxed text-brand-deep">{sentence}</p><p className="mt-1 text-sm leading-relaxed text-muted">{translation}</p></div><AudioButton size="small" playing={playing} onClick={onAudio} disabled={disabled} /></div></div>;
}

export function DifferenceBlock({ firstWord, firstDescription, secondWord, secondDescription }: { firstWord: string; firstDescription: string; secondWord: string; secondDescription: string }) {
  return <div className="grid gap-3 rounded-cb border border-[#CFE4FF] bg-[#F2F7FF] p-4 sm:grid-cols-2"><div className="rounded-cb-sm bg-white p-3"><p className="text-lg font-bold text-brand-deep">{firstWord}</p><p className="mt-1 text-sm text-muted">{firstDescription}</p></div><div className="rounded-cb-sm bg-white p-3"><p className="text-lg font-bold text-brand-deep">{secondWord}</p><p className="mt-1 text-sm text-muted">{secondDescription}</p></div></div>;
}

export function CollocationItem({ phrase, translation, selected, onClick }: { phrase: string; translation?: string; selected?: boolean; onClick?: () => void }) {
  return <button onClick={onClick} aria-pressed={selected} className={cn("cb-control flex min-h-11 w-full items-center justify-between gap-3 rounded-cb-sm border border-line bg-white px-3 text-left", selected && "border-brand bg-[#F2F7FF]")}><span><span className="font-medium text-brand-deep">{phrase}</span>{translation && <span className="ml-2 text-sm text-muted">{translation}</span>}</span>{selected && <Icon name="check" size={20} className="text-brand" />}</button>;
}

export function FlashCard({ side = "front", word, phonetic, meaning, example, onFlip }: { side?: "front" | "back"; word: string; phonetic?: string; meaning?: string; example?: string; onFlip?: () => void }) {
  return <button onClick={onFlip} className="cb-control group min-h-[220px] w-full rounded-[24px] border border-[#CFE4FF] bg-gradient-to-b from-[#F2F7FF] to-white p-6 text-center shadow-soft active:scale-[.99]"><span className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#E6F1FF] text-brand"><Icon name={side === "front" ? "book" : "learn"} size={32} /></span><span className="mt-4 block text-3xl font-bold text-brand-deep">{word}</span>{side === "back" && <><span className="mt-1 block text-sm text-muted">{phonetic}</span><span className="mt-3 block text-base">{meaning}</span><span className="mt-3 block text-sm italic text-muted">{example}</span></>}<span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand"><Icon name="refresh" size={16} />点击翻面</span></button>;
}

export function AnswerFeedback({ variant, title, explanation, answer, expected, actionLabel = "下一题", onAction }: { variant: "correct" | "incorrect"; title: string; explanation: string; answer?: string; expected?: string; actionLabel?: string; onAction?: () => void }) {
  const correct = variant === "correct";
  return <section className={cn("rounded-cb border p-5", correct ? "border-success bg-[#ECFDF3]" : "border-danger bg-[#FFF1F0]")}><div className="flex items-start gap-3"><span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full text-white", correct ? "bg-success" : "bg-danger")}><Icon name={correct ? "check" : "error"} /></span><div><h3 className="text-lg font-semibold text-brand-deep">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted">{explanation}</p>{(answer || expected) && <p className="mt-3 text-sm"><span className="font-semibold">{answer}</span>{expected && <span className="text-muted"> → 正确答案：{expected}</span>}</p>}</div></div><Button className="mt-4" onClick={onAction}>{actionLabel}</Button></section>;
}

export function StudyProgress({ items, current, title }: { items: StepItem[]; current: number; title?: string }) {
  return <section className="rounded-cb border border-line bg-white p-4">{title && <h3 className="mb-4 font-semibold text-brand-deep">{title}</h3>}<StepIndicator items={items} current={current} /></section>;
}
