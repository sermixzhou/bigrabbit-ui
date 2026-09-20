import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu, Popover, Tooltip } from "./overlays";

describe("overlays", () => {
  it("selects dropdown menu items and closes", async () => {
    const onSelect = vi.fn();
    render(<DropdownMenu trigger="更多" items={[{ id: "edit", label: "编辑", onSelect }, { id: "divider", separator: true }, { id: "delete", label: "删除", destructive: true }]} />);
    await userEvent.click(screen.getByRole("button", { name: "更多" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "编辑" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes popover content from its render function", async () => {
    render(<Popover trigger="打开">{(close) => <button onClick={close}>完成</button>}</Popover>);
    await userEvent.click(screen.getByRole("button", { name: "打开" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "完成" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows tooltips on keyboard focus", async () => {
    render(<Tooltip content="复制链接" delay={0}><span>分享</span></Tooltip>);
    await userEvent.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("复制链接");
  });
});
