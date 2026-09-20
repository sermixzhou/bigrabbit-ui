import { createContext, useContext } from "react";

export interface ToggleGroupContextValue {
  type: "single" | "multiple";
  values: string[];
  change: (value: string) => void;
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);
export const useToggleGroupContext = () => useContext(ToggleGroupContext);
