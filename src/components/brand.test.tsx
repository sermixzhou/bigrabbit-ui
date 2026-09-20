import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AchievementBadge, BrandLogo, Mascot, MascotCallout, MascotProvider, StreakBadge } from "./brand";

describe("brand components", () => {
  it("supports accessible and decorative mascots", () => {
    const { rerender } = render(<Mascot label="欢迎状态的小兔" />);
    expect(screen.getByRole("img", { name: "欢迎状态的小兔" })).toBeInTheDocument();
    rerender(<Mascot decorative />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("accepts a consumer-provided sprite sheet", () => {
    render(<Mascot label="自定义角色" spriteSrc="/custom-mascot.png" />);
    expect(screen.getByRole("img", { name: "自定义角色" })).toHaveStyle({ backgroundImage: "url(/custom-mascot.png)" });
  });

  it("shares a consumer-provided sprite through context", () => {
    render(<MascotProvider spriteSrc="/shared-mascot.png"><Mascot label="共享角色" /></MascotProvider>);
    expect(screen.getByRole("img", { name: "共享角色" })).toHaveStyle({ backgroundImage: "url(/shared-mascot.png)" });
  });

  it("renders compact identity text", () => {
    render(<BrandLogo variant="compact" />);
    expect(screen.getByText("Chatty Bunny")).toBeInTheDocument();
  });

  it("renders callouts and reward states", () => {
    render(<><MascotCallout message="继续加油" supportingText="每天进步一点" /><AchievementBadge label="单词达人" state="locked" /><StreakBadge days={7} state="completed" /></>);
    expect(screen.getByText("继续加油")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /单词达人/ })).toBeDisabled();
    expect(screen.getByRole("button", { name: /7 天/ })).toBeInTheDocument();
  });
});
