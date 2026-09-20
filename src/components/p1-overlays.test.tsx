import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog, Drawer } from "./overlays";

describe("P1 overlays", () => {
  it("traps Drawer focus, closes on Escape, and returns focus", async () => {
    function Example() { const [open, setOpen] = useState(false); return <><button onClick={() => setOpen(true)}>Open filters</button><Drawer open={open} onOpenChange={setOpen} title="Filters"><input aria-label="Search filters" /></Drawer></>; }
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Open filters" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("button", { name: "关闭" })).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("uses the safe cancel action as AlertDialog initial focus", async () => {
    const confirm = vi.fn();
    const change = vi.fn();
    render(<AlertDialog open title="Delete account?" description="This cannot be undone." onOpenChange={change} onConfirm={confirm} confirmLabel="Delete" />);
    await waitFor(() => expect(screen.getByRole("button", { name: "取消" })).toHaveFocus());
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(confirm).toHaveBeenCalledOnce();
  });

  it("blocks repeated confirmation while loading", () => {
    render(<AlertDialog open title="Delete account?" description="This cannot be undone." onOpenChange={() => undefined} loading confirmLabel="Delete" />);
    expect(screen.getByRole("button", { name: "加载中" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "取消" })).toBeDisabled();
  });
});
