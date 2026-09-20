import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./primitives";
import { ButtonGroup, Link, Toggle, ToggleGroup } from "./actions";

describe("P1 actions", () => {
  it("groups buttons without changing their behavior", async () => {
    const action = vi.fn();
    render(<ButtonGroup aria-label="Actions"><Button onClick={action}>Save</Button><Button disabled>Delete</Button></ButtonGroup>);
    expect(screen.getByRole("group", { name: "Actions" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(action).toHaveBeenCalledOnce();
  });

  it("reports standalone toggle changes", async () => {
    const change = vi.fn();
    render(<Toggle pressed={false} onPressedChange={change}>Grid</Toggle>);
    await userEvent.click(screen.getByRole("button", { name: "Grid" }));
    expect(change).toHaveBeenCalledWith(true);
  });

  it("supports single and multiple toggle groups", async () => {
    const single = vi.fn();
    const multiple = vi.fn();
    render(<><ToggleGroup aria-label="View" type="single" value="grid" onValueChange={single}><Toggle value="grid">Grid</Toggle><Toggle value="list">List</Toggle></ToggleGroup><ToggleGroup aria-label="Filters" type="multiple" value={["new"]} onValueChange={multiple}><Toggle value="new">New</Toggle><Toggle value="saved">Saved</Toggle></ToggleGroup></>);
    const grid = screen.getByRole("button", { name: "Grid" });
    grid.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(single).toHaveBeenCalledWith("list");
    const fresh = screen.getByRole("button", { name: "New" });
    const saved = screen.getByRole("button", { name: "Saved" });
    expect(fresh).toHaveAttribute("tabindex", "0");
    expect(saved).toHaveAttribute("tabindex", "-1");
    fresh.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(saved).toHaveFocus();
    expect(saved).toHaveAttribute("tabindex", "0");
    expect(multiple).not.toHaveBeenCalled();
    await userEvent.click(saved);
    expect(multiple).toHaveBeenCalledWith(["new", "saved"]);
  });

  it("keeps disabled links non-navigable", async () => {
    const click = vi.fn();
    render(<Link href="/profile" disabled onClick={click}>Profile</Link>);
    const link = screen.getByText("Profile");
    expect(link).not.toHaveAttribute("href");
    await userEvent.click(link);
    expect(click).toHaveBeenCalledOnce();
  });
});
