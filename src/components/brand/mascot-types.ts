export type MascotState = "welcome" | "learning" | "thinking" | "success" | "error" | "encourage" | "empty" | "locked" | "sleep" | "celebrate";

export const mascotPosition: Record<MascotState, string> = {
  welcome: "0% 0%",
  learning: "33.333% 0%",
  thinking: "66.666% 0%",
  success: "100% 0%",
  error: "0% 50%",
  encourage: "33.333% 50%",
  empty: "66.666% 50%",
  locked: "100% 50%",
  sleep: "0% 100%",
  celebrate: "33.333% 100%",
};
