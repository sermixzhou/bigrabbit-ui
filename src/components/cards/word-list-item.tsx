import { ListItem, type ListItemProps } from "./list-item";

export function WordListItem({ index, word, meaning, state = "default", status, ...props }: Omit<ListItemProps, "title" | "description" | "leadingIcon"> & { index: number; word: string; meaning: string; status?: string }) {
  return <ListItem leadingIcon={state === "completed" ? "check" : state === "locked" ? "lock" : "book"} title={word} description={meaning} trailing={status ?? String(index).padStart(2, "0")} state={state} {...props} />;
}
