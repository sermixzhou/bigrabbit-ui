import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const entries = {
  index: resolve(projectRoot, "src/index.ts"),
  icon: resolve(projectRoot, "src/components/icon.tsx"),
  primitives: resolve(projectRoot, "src/components/primitives/index.ts"),
  forms: resolve(projectRoot, "src/components/forms/index.ts"),
  cards: resolve(projectRoot, "src/components/cards/index.ts"),
  navigation: resolve(projectRoot, "src/components/navigation/index.ts"),
  learning: resolve(projectRoot, "src/components/learning/index.ts"),
  feedback: resolve(projectRoot, "src/components/feedback/index.ts"),
  brand: resolve(projectRoot, "src/components/brand/index.ts"),
};

export default defineConfig({
  publicDir: false,
  plugins: [react()],
  build: {
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      cssFileName: "styles",
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: (id) => id === "react" || id === "react-dom" || id.startsWith("react/"),
      output: {
        exports: "named",
        assetFileNames: (assetInfo) => assetInfo.names.includes("styles.css")
          ? "styles.css"
          : "assets/[name]-[hash][extname]",
      },
    },
  },
});
