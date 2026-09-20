import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  AchievementCard,
  Card,
  LearningProgressCard,
  ListItem,
  ReviewCard,
  SettingListItem,
  UnitCard,
  WordCard,
  WordListItem,
} from "./cards";

describe("cards and lists", () => {
  it("renders card regions and footer content", () => {
    render(<Card title="学习提示" description="先理解，再练习" footer={<button>知道了</button>}>正文</Card>);
    expect(screen.getByRole("heading", { name: "学习提示" })).toBeInTheDocument();
    expect(screen.getByText("正文")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "知道了" })).toBeInTheDocument();
  });

  it("forwards semantic-card clicks", async () => {
    const onClick = vi.fn();
    render(<LearningProgressCard title="家庭与朋友" subtitle="20 个单词" value={30} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: /家庭与朋友/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("locks unavailable units", () => {
    render(<UnitCard unit="UNIT 2" title="学校" description="校园生活" progress={0} state="locked" />);
    const card = screen.getByRole("button", { name: /学校/ });
    expect(card).toBeDisabled();
    expect(card).toHaveTextContent("锁定");
  });

  it("renders word, review, and achievement states", () => {
    render(<><WordCard word="father" phonetic="/ˈfɑːðər/" meaning="父亲" favorite /><ReviewCard title="今日复习" description="需要巩固" count={12} /><AchievementCard title="单词达人" description="累计 50 词" state="completed" /></>);
    expect(screen.getByRole("button", { name: /father/ })).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /单词达人/ })).toBeInTheDocument();
  });

  it("provides locked list semantics", () => {
    render(<ListItem leadingIcon="lock" title="高级挑战" state="locked" />);
    expect(screen.getByRole("button", { name: /高级挑战/ })).toBeDisabled();
  });

  it("renders word and setting list specializations", () => {
    render(<><WordListItem index={2} word="father" meaning="父亲" status="学习中" state="current" /><SettingListItem icon="settings" title="学习设置" value="每天 10 词" /></>);
    expect(screen.getByRole("button", { name: /father/ })).toHaveTextContent("学习中");
    expect(screen.getByRole("button", { name: /学习设置/ })).toHaveTextContent("每天 10 词");
  });
});
