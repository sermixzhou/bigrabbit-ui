import { useId, useRef, useState, type DragEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  label?: string;
  helper?: string;
  errorMessage?: string;
  loading?: boolean;
  files?: File[];
  emptyContent?: ReactNode;
  maxSizeLabel?: string;
  onFilesSelected?: (files: File[]) => void;
}

export function FileUpload({ label, helper, errorMessage, loading = false, files = [], emptyContent, maxSizeLabel, onFilesSelected, accept, multiple, disabled, className, id: providedId, ...props }: FileUploadProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const select = (list: FileList | null) => { if (list && !disabled && !loading) onFilesSelected?.(Array.from(list)); };
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); select(event.dataTransfer.files); };
  return <div className={cn("w-full", className)}>{label && <label className="cb-label" htmlFor={id}>{label}</label>}<input {...props} ref={inputRef} id={id} type="file" accept={accept} multiple={multiple} disabled={disabled || loading} className="sr-only" onChange={(event) => select(event.currentTarget.files)} /><div role="button" tabIndex={disabled || loading ? -1 : 0} aria-disabled={disabled || loading} aria-busy={loading} onClick={() => !disabled && !loading && inputRef.current?.click()} onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !disabled && !loading) { event.preventDefault(); inputRef.current?.click(); } }} onDragEnter={(event) => { event.preventDefault(); if (!disabled && !loading) setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={cn("cb-focus flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-cb border border-dashed border-border bg-surface-soft p-5 text-center transition hover:border-primary hover:bg-primary-subtle", dragging && "border-primary bg-primary-soft ring-4 ring-focus-ring-soft", errorMessage && "border-danger bg-danger-soft", (disabled || loading) && "cursor-not-allowed border-disabled-border bg-disabled-surface text-disabled-text")}><span className={cn("mb-3 flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary", (disabled || loading) && "bg-disabled-bg text-disabled-text")}><Icon name={loading ? "refresh" : files.length ? "check" : "share"} size={20} className={loading ? "animate-spin" : undefined} /></span>{loading ? <><strong className="text-sm text-text-strong">正在处理文件</strong><span className="mt-1 text-xs text-text-muted">请稍候，不要关闭页面</span></> : files.length ? <><strong className="text-sm text-text-strong">{files.length === 1 ? files[0].name : `已选择 ${files.length} 个文件`}</strong><span className="mt-1 text-xs text-text-muted">点击或拖放以重新选择</span></> : emptyContent ?? <><strong className="text-sm text-text-strong">点击上传或拖放文件</strong><span className="mt-1 text-xs text-text-muted">{helper ?? [accept, maxSizeLabel].filter(Boolean).join(" · ")}</span></>}</div>{errorMessage && <span className="mt-1.5 flex items-center gap-1 text-xs text-danger"><Icon name="error" size={16} />{errorMessage}</span>}</div>;
}
