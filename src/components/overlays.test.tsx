import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DropdownMenu, Popover, Tooltip } from "./overlays";
import { Button } from "./primitives";

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

  it("composes trigger refs, handlers and accessibility props without nested buttons", async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<DropdownMenu trigger={<Button ref={ref} onClick={onClick} aria-describedby="hint">操作</Button>} items={[{ id: "edit", label: "编辑" }]} />);
    const trigger = screen.getByRole("button", { name: "操作" });
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-describedby", "hint");
    expect(container.querySelector("button button")).toBeNull();
    await userEvent.click(trigger);
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("dismisses with Escape and returns focus to the original trigger", async () => {
    render(<DropdownMenu trigger={<Button>菜单</Button>} items={[{ id: "edit", label: "编辑" }]} />);
    const trigger = screen.getByRole("button", { name: "菜单" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "编辑" })).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps an interactive tooltip trigger as the only focus stop", async () => {
    const { container } = render(<Tooltip content="收藏" delay={0}><Button>提示</Button></Tooltip>);
    expect(container.querySelectorAll("button")).toHaveLength(1);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "提示" })).toHaveFocus();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
