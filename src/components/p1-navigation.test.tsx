import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Breadcrumb, NavigationMenu, Pagination } from "./navigation";

describe("P1 navigation", () => {
  it("marks the current breadcrumb", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Settings", href: "/settings" }, { label: "Profile", current: true }]} />);
    expect(screen.getByRole("navigation", { name: "面包屑导航" })).toBeInTheDocument();
    expect(screen.getByText("Profile")).toHaveAttribute("aria-current", "page");
  });

  it("changes pagination pages and respects boundaries", async () => {
    const change = vi.fn();
    const { rerender } = render(<Pagination page={1} totalPages={5} onChange={change} />);
    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "下一页" }));
    expect(change).toHaveBeenCalledWith(2);
    rerender(<Pagination page={5} totalPages={5} onChange={change} />);
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
  });

  it("opens and dismisses navigation submenus with the keyboard", async () => {
    render(<NavigationMenu items={[{ value: "products", label: "Products", children: [{ title: "Analytics", description: "Understand activity", href: "/analytics" }] }]} />);
    const trigger = screen.getByRole("button", { name: /Products/ });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("menuitem", { name: /Analytics/ })).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
