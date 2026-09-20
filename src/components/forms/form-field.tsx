import { cloneElement, isValidElement, useId, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";

type ControlProps = { id?: string; "aria-describedby"?: string; "aria-invalid"?: boolean; required?: boolean };

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  helper?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  required?: boolean;
  requiredLabel?: string;
  children: ReactElement<ControlProps>;
  controlId?: string;
}

export function FormField({ label, helper, description, errorMessage, required, requiredLabel, children, controlId, className, ...props }: FormFieldProps) {
  const messages = useChattyBunnyMessages();
  const generatedId = useId();
  const id = controlId ?? children.props.id ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const messageId = errorMessage || helper ? `${id}-message` : undefined;
  const describedBy = [children.props["aria-describedby"], descriptionId, messageId].filter(Boolean).join(" ") || undefined;
  const control = isValidElement(children) ? cloneElement(children, { id, required: children.props.required ?? required, "aria-invalid": children.props["aria-invalid"] ?? Boolean(errorMessage), "aria-describedby": describedBy }) : children;
  return <div {...props} className={cn("w-full", className)}><label htmlFor={id} className="cb-label">{label}{required && <span className="ml-1 text-danger" aria-label={requiredLabel ?? messages.required}>*</span>}</label>{description && <p id={descriptionId} className="mb-2 text-xs text-text-muted">{description}</p>}{control}{messageId && <p id={messageId} className={cn("mt-1.5 text-xs", errorMessage ? "text-danger" : "text-text-muted")}>{errorMessage ?? helper}</p>}</div>;
}
