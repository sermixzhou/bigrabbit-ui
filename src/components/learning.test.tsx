import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FlashCard, PronunciationButton, QuizOption, WordHeader } from "./learning";

describe("learning components", () => {
  it("locks evaluated quiz answers", async () => {
    const onClick = vi.fn();
    render(<QuizOption prefix="C" label="father" state="correct" onClick={onClick} />);
    const option = screen.getByRole("button", { name: /father/ });
    expect(option).toBeDisabled();
    await userEvent.click(option);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets the consumer control flash-card state", async () => {
    function Example() {
      const [side, setSide] = useState<"front" | "back">("front");
      return <FlashCard side={side} word="father" meaning="n. 父亲；爸爸" onFlip={() => setSide(side === "front" ? "back" : "front")} />;
    }
    render(<Example />);
    expect(screen.queryByText("n. 父亲；爸爸")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /father/ }));
    expect(screen.getByText("n. 父亲；爸爸")).toBeVisible();
  });

  it("disables pronunciation while processing", () => {
    render(<PronunciationButton state="processing" />);
    expect(screen.getByRole("button", { name: "处理中" })).toBeDisabled();
  });

  it("emits favorite actions from the word header", async () => {
    const onFavorite = vi.fn();
    render(<WordHeader word="father" phonetic="/ˈfɑːðər/" meaning="父亲" onFavorite={onFavorite} />);
    await userEvent.click(screen.getByRole("button", { name: "收藏" }));
    expect(onFavorite).toHaveBeenCalledOnce();
  });
});
