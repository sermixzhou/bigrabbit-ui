export type Semantic = "neutral" | "info" | "success" | "warning" | "error";

export const semanticStyles: Record<Semantic, string> = {
  neutral: "bg-[#F5F7FA] text-[#68758A] border-[#E5EAF2]",
  info: "bg-[#F2F7FF] text-brand border-[#CFE4FF]",
  success: "bg-[#ECFDF3] text-success border-[#BBF7D0]",
  warning: "bg-[#FFF8E6] text-[#B86900] border-[#FDE7AA]",
  error: "bg-[#FFF1F0] text-danger border-[#FFD0CC]",
};
