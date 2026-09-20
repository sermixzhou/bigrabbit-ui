import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Input, Search, Segment, Switch } from "./forms";

describe("forms", () => {
  it("connects labels, messages, and error semantics", () => {
    render(<Input label="邮箱" value="bad" errorMessage="请输入有效邮箱" readOnly />);
    const input = screen.getByRole("textbox", { name: "邮箱" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("请输入有效邮箱");
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
});
