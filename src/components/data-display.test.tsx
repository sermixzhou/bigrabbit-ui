import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion, Avatar, ChoiceCard, ChoiceGroup, StatCard } from "./data-display";

describe("data display", () => {
  it("renders avatar fallbacks and status", () => {
    render(<Avatar initials="CB" alt="Chatty Bunny" status="online" />);
    expect(screen.getByRole("img", { name: "Chatty Bunny" })).toHaveTextContent("CB");
    expect(screen.getByLabelText("online")).toBeInTheDocument();
  });

  it("expands accordion items and respects disabled items", async () => {
    render(<Accordion items={[{ value: "one", title: "第一项", content: "第一项内容" }, { value: "two", title: "第二项", content: "第二项内容", disabled: true }]} />);
    await userEvent.click(screen.getByRole("button", { name: "第一项" }));
    expect(screen.getByRole("region", { name: "第一项" })).toHaveTextContent("第一项内容");
    expect(screen.getByRole("button", { name: "第二项" })).toBeDisabled();
  });

  it("exposes stat and choice semantics", async () => {
    const onClick = vi.fn();
    render(<><StatCard label="本周学习" value="12h" progress={60} /><ChoiceCard title="专注模式" description="减少干扰" selected onClick={onClick} /></>);
    expect(screen.getByText("12h")).toBeInTheDocument();
    const choice = screen.getByRole("button", { name: /专注模式/ });
    expect(choice).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(choice);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("adds grouped choice semantics and arrow-key selection", async () => {
    const onValueChange = vi.fn();
    render(<ChoiceGroup aria-label="模式" defaultValue="focus" onValueChange={onValueChange}><ChoiceCard value="focus" title="专注" /><ChoiceCard value="relaxed" title="轻松" /></ChoiceGroup>);
    const focus = screen.getByRole("radio", { name: "专注" });
    focus.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("radio", { name: "轻松" })).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledWith("relaxed");
  });
});
