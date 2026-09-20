import { StatePanel, type StatePanelProps } from "./state-panel";

export const EmptyState = (props: Omit<StatePanelProps, "mascot">) => <StatePanel mascot="empty" {...props} />;
