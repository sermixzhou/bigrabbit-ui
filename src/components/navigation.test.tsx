import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BottomTabBar, Navbar, Sidebar, TopNavigation } from "./navigation";

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

  it("opens the responsive navbar and selects an item", async () => {
    const onClick = vi.fn();
    render(<Navbar brand="Chatty Bunny" items={[{ label: "产品", onClick }]} />);
    await userEvent.click(screen.getByRole("button", { name: "打开导航菜单" }));
    expect(screen.getByRole("button", { name: "关闭导航菜单" })).toHaveAttribute("aria-expanded", "true");
    const products = screen.getAllByRole("button", { name: "产品" });
    await userEvent.click(products[products.length - 1]);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("reports sidebar selection and closes its mobile drawer", async () => {
    const onSelect = vi.fn();
    const onMobileOpenChange = vi.fn();
    render(<Sidebar mobileOpen groups={[{ label: "工作区", items: [{ label: "首页", value: "home", active: true }] }]} onSelect={onSelect} onMobileOpenChange={onMobileOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "首页" }));
    expect(onSelect).toHaveBeenCalledWith("home");
    expect(onMobileOpenChange).toHaveBeenCalledWith(false);
  });
});
