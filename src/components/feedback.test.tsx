import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomSheet, EmptyState, Modal, Toast } from "./feedback";

describe("feedback components", () => {
  it("renders no modal content while closed", () => {
    render(<Modal open={false} title="退出学习？" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("routes modal actions to the consumer", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(<Modal open title="退出学习？" onConfirm={onConfirm} onCancel={onCancel} />);
    expect(screen.getByRole("dialog", { name: "退出学习？" })).toHaveAttribute("aria-modal", "true");
    await userEvent.click(screen.getByRole("button", { name: "确定" }));
    await userEvent.click(screen.getByRole("button", { name: "取消" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("returns selected bottom-sheet values", async () => {
    const onSelect = vi.fn();
    render(<BottomSheet open title="选择模式" options={[{ label: "单词学习", value: "words" }]} onSelect={onSelect} />);
    expect(screen.getByRole("dialog", { name: "选择模式" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "单词学习" }));
    expect(onSelect).toHaveBeenCalledWith("words");
  });

  it("announces toasts and actionable empty states", () => {
    render(<><Toast message="保存成功" variant="success" /><EmptyState title="暂无内容" description="去添加一些内容吧。" actionLabel="去添加" /></>);
    expect(screen.getByRole("status")).toHaveTextContent("保存成功");
    expect(screen.getByRole("button", { name: "去添加" })).toBeInTheDocument();
  });
});
