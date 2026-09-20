import type { IconName } from "../icon";
import type { Semantic } from "../primitives";

export const feedbackMeta: Record<Semantic, { icon: IconName; surface: string; text: string }> = {
  neutral: { icon: "info", surface: "border-line bg-white", text: "text-muted" },
  info: { icon: "info", surface: "border-[#CFE4FF] bg-[#F2F7FF]", text: "text-brand" },
  success: { icon: "check", surface: "border-[#BBF7D0] bg-[#ECFDF3]", text: "text-success" },
  warning: { icon: "warning", surface: "border-[#FDE7AA] bg-[#FFF8E6]", text: "text-[#B86900]" },
  error: { icon: "error", surface: "border-[#FFD0CC] bg-[#FFF1F0]", text: "text-danger" },
};
