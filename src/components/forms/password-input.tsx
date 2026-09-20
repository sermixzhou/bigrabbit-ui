import { useState, type InputHTMLAttributes } from "react";
import { Input } from "./input";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helper?: string;
  errorMessage?: string;
}

export function PasswordInput({ autoComplete = "current-password", ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return <Input {...props} type={visible ? "text" : "password"} autoComplete={autoComplete} clearable={false} trailing={<button type="button" aria-label={visible ? "隐藏密码" : "显示密码"} aria-pressed={visible} disabled={props.disabled} onClick={() => setVisible((current) => !current)} className="cb-focus mr-0.5 flex min-h-11 items-center rounded-cb-sm px-3 text-sm font-semibold text-primary hover:bg-primary-subtle disabled:cursor-not-allowed disabled:text-disabled-text">{visible ? "隐藏" : "显示"}</button>} />;
}
