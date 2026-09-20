import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomTabBar, TopNavigation } from "./navigation";

describe("navigation", () => {
  it("exposes top-navigation actions", async () => {
    const onBack = vi.fn();
    const onAction = vi.fn();
    render(<TopNavigation title="单词学习" subtitle="2 / 5" actionIcon="more" onBack={onBack} onAction={onAction} />);
    await userEvent.click(screen.getByRole("button", { name: "返回" }));
    await userEvent.click(screen.getByRole("button", { name: "更多" }));
    expect(onBack).toHaveBeenCalledOnce();
    expect(onAction).toHaveBeenCalledOnce();
  });

  it("marks and changes the active destination", async () => {
    const onChange = vi.fn();
    render(<BottomTabBar items={[{ label: "首页", value: "home", icon: "home" }, { label: "学习", value: "learn", icon: "learn", badge: "3" }]} value="home" onChange={onChange} />);
    expect(screen.getByRole("button", { name: "首页" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: /学习/ }));
    expect(onChange).toHaveBeenCalledWith("learn");
  });
});
