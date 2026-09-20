import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormField, NumberInput, OTPInput } from "./forms";

describe("P1 forms", () => {
  it("increments, decrements, clamps, and handles arrow keys", async () => {
    const change = vi.fn();
    render(<NumberInput label="Guests" defaultValue={2} min={1} max={3} onValueChange={change} />);
    await userEvent.click(screen.getByRole("button", { name: "增加" }));
    expect(screen.getByRole("textbox", { name: "Guests" })).toHaveValue("3");
    expect(screen.getByRole("button", { name: "增加" })).toBeDisabled();
    fireEvent.keyDown(screen.getByRole("textbox", { name: "Guests" }), { key: "ArrowDown" });
    expect(change).toHaveBeenLastCalledWith(2);
  });

  it("accepts decimal and negative manual values without rendering NaN", async () => {
    const change = vi.fn();
    render(<NumberInput label="Offset" defaultValue={0} step={0.5} min={-2} onValueChange={change} />);
    const input = screen.getByRole("textbox", { name: "Offset" });
    await userEvent.clear(input);
    await userEvent.type(input, "-1.5");
    fireEvent.blur(input);
    expect(input).toHaveValue("-1.5");
    expect(input).not.toHaveValue("NaN");
  });

  it("advances through OTP input, pastes, deletes, and completes", async () => {
    const change = vi.fn();
    const complete = vi.fn();
    const { rerender } = render(<OTPInput length={4} value="" onChange={change} onComplete={complete} />);
    const first = screen.getByLabelText("验证码第 1 位");
    await userEvent.type(first, "1");
    expect(change).toHaveBeenCalledWith("1");
    rerender(<OTPInput length={4} value="1" onChange={change} onComplete={complete} />);
    fireEvent.paste(screen.getByLabelText("验证码第 1 位"), { clipboardData: { getData: () => "8274" } });
    expect(change).toHaveBeenLastCalledWith("8274");
    expect(complete).toHaveBeenCalledWith("8274");
    rerender(<OTPInput length={4} value="12" onChange={change} />);
    const second = screen.getByLabelText("验证码第 2 位");
    second.focus();
    await userEvent.keyboard("{Backspace}");
    expect(change).toHaveBeenLastCalledWith("1");
  });

  it("associates FormField label, description, helper, and error", () => {
    const { rerender } = render(<FormField label="Email" description="Account email" helper="Never shared" required><input /></FormField>);
    const input = screen.getByRole("textbox", { name: /Email/ });
    expect(input).toHaveAccessibleDescription(/Account email Never shared/);
    rerender(<FormField label="Email" errorMessage="Invalid email"><input /></FormField>);
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });
});
