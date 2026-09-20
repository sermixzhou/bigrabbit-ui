import { Tag } from "../primitives";
import { useChattyBunnyMessages } from "../chatty-bunny-provider";
import type { SemanticCardProps } from "./semantic-card";

export function StatusTag({ state }: { state: NonNullable<SemanticCardProps["state"]> }) {
  const messages = useChattyBunnyMessages();
  const labels = { default: messages.notStarted, current: messages.inProgress, completed: messages.completed, locked: messages.locked, disabled: messages.unavailable };
  return <Tag variant={state === "completed" ? "success" : state === "current" ? "info" : "neutral"}>{labels[state]}</Tag>;
}
