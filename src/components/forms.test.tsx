import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Combobox, FileUpload, Input, PasswordInput, Search, Segment, Select, Slider, Switch, Textarea } from "./forms";

describe("forms", () => {
  it("connects labels, messages, and error semantics", () => {
    render(<Input label="邮箱" value="bad" errorMessage="请输入有效邮箱" readOnly />);
    const input = screen.getByRole("textbox", { name: "邮箱" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("请输入有效邮箱");
    expect(input.parentElement).toHaveClass("border-danger", "bg-danger-soft");
  });

  it("uses semantic disabled tokens", () => {
    render(<Input label="用户名" value="Chatty Bunny" disabled readOnly />);
    const input = screen.getByRole("textbox", { name: "用户名" });
    expect(input.parentElement).toHaveClass("border-disabled-border", "bg-disabled-surface");
    expect(input).toHaveClass("disabled:text-disabled-text");
  });

  it("supports explicit clear actions", async () => {
    const onClear = vi.fn();
    render(<Input label="单词" value="father" onClear={onClear} readOnly />);
    await userEvent.click(screen.getByRole("button", { name: "清空输入" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("keeps native checkbox and switch semantics", async () => {
    const onCheck = vi.fn();
    const onSwitch = vi.fn();
    render(<><Checkbox label="自动播放" checked={false} onChange={onCheck} /><Switch label="学习提醒" checked={false} onChange={onSwitch} /></>);
    await userEvent.click(screen.getByText("自动播放"));
    await userEvent.click(screen.getByText("学习提醒"));
    expect(onCheck).toHaveBeenCalledWith(true);
    expect(onSwitch).toHaveBeenCalledWith(true);
  });

  it("reports segment changes", async () => {
    const onChange = vi.fn();
    render(<Segment items={[{ label: "全部", value: "all" }, { label: "已掌握", value: "done" }]} value="all" onChange={onChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "已掌握" }));
    expect(onChange).toHaveBeenCalledWith("done");
  });

  it("announces search loading without exposing a clear action", () => {
    render(<Search aria-label="搜索课程" value="word" loading readOnly />);
    expect(screen.getByRole("searchbox", { name: "搜索课程" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "清空搜索" })).not.toBeInTheDocument();
  });

  it("supports textarea messages and character counts", () => {
    render(<Textarea label="简介" value="hello" maxLength={20} showCount errorMessage="请补充内容" readOnly />);
    expect(screen.getByRole("textbox", { name: "简介" })).toHaveAccessibleDescription(/请补充内容/);
    expect(screen.getByLabelText("5 / 20 characters")).toBeInTheDocument();
  });

  it("selects custom select options with the keyboard", async () => {
    const onChange = vi.fn();
    render(<Select label="城市" options={[{ label: "上海", value: "sh" }, { label: "北京", value: "bj", disabled: true }, { label: "深圳", value: "sz" }]} onChange={onChange} />);
    const trigger = screen.getByRole("combobox", { name: "城市" });
    await userEvent.click(trigger);
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith("sz");
  });

  it("filters, chooses, and clears combobox values", async () => {
    const onChange = vi.fn();
    render(<Combobox label="国家" options={[{ label: "中国", value: "cn" }, { label: "日本", value: "jp" }]} value="cn" onChange={onChange} />);
    const input = screen.getByRole("combobox", { name: "国家" });
    await userEvent.clear(input);
    await userEvent.type(input, "日本");
    await userEvent.click(screen.getByRole("option", { name: "日本" }));
    expect(onChange).toHaveBeenCalledWith("jp");
  });

  it("toggles password visibility accessibly", async () => {
    render(<PasswordInput label="密码" value="secret" readOnly />);
    const input = screen.getByLabelText("密码");
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: "显示密码" }));
    expect(input).toHaveAttribute("type", "text");
  });

  it("keeps slider native and reports selected files", () => {
    const onFilesSelected = vi.fn();
    render(<><Slider label="音量" value={40} readOnly showValue /><FileUpload label="附件" onFilesSelected={onFilesSelected} /></>);
    expect(screen.getByRole("slider", { name: "音量" })).toHaveValue("40");
    const file = new File(["hello"], "hello.txt", { type: "text/plain" });
    fireEvent.drop(screen.getByRole("button", { name: /点击上传/ }), { dataTransfer: { files: [file] } });
    expect(onFilesSelected).toHaveBeenCalledWith([file]);
  });
});
