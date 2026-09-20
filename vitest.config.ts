import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: ["src/components/index.ts"],
      thresholds: {
        statements: 55,
        branches: 45,
        functions: 55,
        lines: 55
      }
    }
  }
});
