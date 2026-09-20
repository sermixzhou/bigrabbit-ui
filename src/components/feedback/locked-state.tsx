import { StatePanel, type StatePanelProps } from "./state-panel";

export const LockedState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="lock" {...props} />;
