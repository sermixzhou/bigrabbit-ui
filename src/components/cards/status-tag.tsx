import { Tag } from "../primitives";
import type { SemanticCardProps } from "./semantic-card";

export function StatusTag({ state }: { state: NonNullable<SemanticCardProps["state"]> }) {
  const labels = { default: "未开始", current: "进行中", completed: "已完成", locked: "未解锁", disabled: "不可用" };
  return <Tag variant={state === "completed" ? "success" : state === "current" ? "info" : "neutral"}>{labels[state]}</Tag>;
}
