import { useId, useRef, useState, type DragEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  loading?: boolean;
  files?: File[];
  emptyContent?: ReactNode;
  maxSizeLabel?: string;
  processingLabel?: string;
  processingHint?: string;
  selectedLabel?: (count: number) => string;
  replaceLabel?: string;
  dropLabel?: string;
  onFilesSelected?: (files: File[]) => void;
}

export function FileUpload({ label, helper, errorMessage, loading = false, files = [], emptyContent, maxSizeLabel, processingLabel, processingHint, selectedLabel, replaceLabel, dropLabel, onFilesSelected, accept, multiple, disabled, className, id: providedId, ...props }: FileUploadProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const select = (list: FileList | null) => { if (list && !disabled && !loading) onFilesSelected?.(Array.from(list)); };
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); select(event.dataTransfer.files); };
  return <div className={cn("w-full", className)}>{label && <label className="cb-label" htmlFor={id}>{label}</label>}<input {...props} ref={inputRef} id={id} type="file" accept={accept} multiple={multiple} disabled={disabled || loading} className="sr-only" onChange={(event) => select(event.currentTarget.files)} /><div role="button" tabIndex={disabled || loading ? -1 : 0} aria-disabled={disabled || loading} aria-busy={loading} onClick={() => !disabled && !loading && inputRef.current?.click()} onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !disabled && !loading) { event.preventDefault(); inputRef.current?.click(); } }} onDragEnter={(event) => { event.preventDefault(); if (!disabled && !loading) setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={cn("cb-focus flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-cb border border-dashed border-border bg-surface-soft p-5 text-center transition hover:border-primary hover:bg-primary-subtle", dragging && "border-primary bg-primary-soft ring-4 ring-focus-ring-soft", errorMessage && "border-danger bg-danger-soft", (disabled || loading) && "cursor-not-allowed border-disabled-border bg-disabled-surface text-disabled-text")}><span className={cn("mb-3 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary", (disabled || loading) && "bg-disabled-bg text-disabled-text")}><Icon name={loading ? "refresh" : files.length ? "check" : "share"} size={20} className={loading ? "animate-spin" : undefined} /></span>{loading ? <><strong className="text-sm text-text-strong">{processingLabel ?? messages.fileProcessing}</strong><span className="mt-1 text-xs text-text-muted">{processingHint ?? messages.fileProcessingHint}</span></> : files.length ? <><strong className="text-sm text-text-strong">{files.length === 1 ? files[0].name : (selectedLabel ?? messages.fileSelected)(files.length)}</strong><span className="mt-1 text-xs text-text-muted">{replaceLabel ?? messages.fileReplace}</span></> : emptyContent ?? <><strong className="text-sm text-text-strong">{dropLabel ?? messages.fileDrop}</strong><span className="mt-1 text-xs text-text-muted">{helper ?? [accept, maxSizeLabel].filter(Boolean).join(" · ")}</span></>}</div>{errorMessage && <span className="mt-1.5 flex items-center gap-1 text-xs text-danger"><Icon name="error" size={16} />{errorMessage}</span>}</div>;
}
