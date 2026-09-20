import { createContext, useContext } from "react";

export interface ChoiceGroupContextValue {
  selectionMode: "single" | "multiple";
  selectedValues: string[];
  toggle: (value: string) => void;
}

export const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(null);

export function useChoiceGroupContext() {
  return useContext(ChoiceGroupContext);
}
