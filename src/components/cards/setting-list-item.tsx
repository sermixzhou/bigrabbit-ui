import type { IconName } from "../icon";
import { ListItem, type ListItemProps } from "./list-item";

export function SettingListItem({ icon, title, description, value, ...props }: Omit<ListItemProps, "leadingIcon" | "trailing"> & { icon: IconName; value?: string }) {
  return <ListItem leadingIcon={icon} title={title} description={description} trailing={value} {...props} />;
}
