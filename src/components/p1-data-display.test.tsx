import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActionCard, Avatar, ProfileCard, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Timeline } from "./data-display";

describe("P1 data display", () => {
  it("renders native table semantics and empty content", () => {
    const { rerender } = render(<Table><TableCaption>Recent activity</TableCaption><TableHeader><TableRow><TableHead>Event</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Signed in</TableCell></TableRow></TableBody></Table>);
    expect(screen.getByRole("table", { name: "Recent activity" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Event" })).toBeInTheDocument();
    rerender(<Table><TableBody emptyContent="No activity" /></Table>);
    expect(screen.getByText("No activity")).toBeInTheDocument();
  });

  it("renders Timeline as a semantic list", () => {
    render(<Timeline items={[{ title: "Account created", state: "completed" }, { title: "Profile updated", state: "current" }]} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("uses link or button semantics for ActionCard", async () => {
    const click = vi.fn();
    render(<><ActionCard href="/setup" title="Continue setup" /><ActionCard title="Run check" onClick={click} /></>);
    expect(screen.getByRole("link", { name: /Continue setup/ })).toHaveAttribute("href", "/setup");
    await userEvent.click(screen.getByRole("button", { name: /Run check/ }));
    expect(click).toHaveBeenCalledOnce();
  });

  it("keeps a noninteractive ProfileCard presentational", () => {
    render(<ProfileCard avatar={<Avatar initials="MC" alt="Milo" />} name="Milo" subtitle="Golden Retriever" description="3 years old" />);
    expect(screen.getByRole("article")).toHaveTextContent("Milo");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
