import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Icon } from "./icon";
import { Badge, Button, Chip, Progress, StepIndicator } from "./primitives";

describe("primitives", () => {
  it("renders SVG masks as quoted URLs", () => {
    const { container } = render(<Icon name="check" />);
    expect(container.firstElementChild).toHaveStyle({ maskImage: expect.stringContaining('url("') });
  });

  it("renders badge content", () => {
    render(<Badge variant="success">NEW</Badge>);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("prevents interaction while a button is loading", async () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>提交</Button>);

    const button = screen.getByRole("button", { name: "加载中" });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("reports the next controlled chip value", async () => {
    const onSelectedChange = vi.fn();
    render(<Chip selected={false} onSelectedChange={onSelectedChange}>基础词汇</Chip>);

    await userEvent.click(screen.getByRole("button", { name: "基础词汇" }));
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("exposes progress semantics", () => {
    render(<Progress value={4} max={10} label="课程进度" showValue />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("aria-valuenow", "4");
    expect(progress).toHaveAttribute("aria-valuemax", "10");
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("labels completed and current steps", () => {
    render(<StepIndicator items={[{ label: "理解" }, { label: "练习" }, { label: "完成" }]} current={1} />);
    expect(screen.getByRole("list", { name: "步骤进度" })).toBeInTheDocument();
    expect(screen.getByText("练习")).toHaveClass("text-brand-deep");
  });
});
