import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChattyBunnyProvider } from "./chatty-bunny-provider";
import { Button } from "./primitives";
import { Select } from "./forms";

describe("ChattyBunnyProvider", () => {
  it("uses zh-CN by default for backwards compatibility", () => {
    render(<><Button loading>提交</Button><Select label="城市" options={[]} /></>);
    expect(screen.getByRole("button", { name: "加载中" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "城市" })).toHaveTextContent("请选择");
  });

  it("supports English, message overrides, and explicit prop precedence", () => {
    render(<ChattyBunnyProvider locale="en" messages={{ loading: "Working" }}><Button loading>Submit</Button><Select label="City" placeholder="Pick one" options={[]} /></ChattyBunnyProvider>);
    expect(screen.getByRole("button", { name: "Working" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "City" })).toHaveTextContent("Pick one");
  });
});
