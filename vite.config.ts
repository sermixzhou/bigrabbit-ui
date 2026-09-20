import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "github-pages" ? "/chatty-bunny/" : "/",
  plugins: [react()],
  server: { host: "127.0.0.1", port: 4173 },
}));
