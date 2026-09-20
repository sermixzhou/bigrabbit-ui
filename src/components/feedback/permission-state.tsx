import { StatePanel, type StatePanelProps } from "./state-panel";

export const PermissionState = (props: Omit<StatePanelProps, "icon">) => <StatePanel icon="microphone" {...props} />;
