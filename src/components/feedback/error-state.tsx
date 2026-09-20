import { StatePanel, type StatePanelProps } from "./state-panel";

export const ErrorState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="error" {...props} />;
