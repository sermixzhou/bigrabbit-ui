import { defineConfig } from "@playwright/test";

const viewports = [
  { name: "mobile-375x812", viewport: { width: 375, height: 812 } },
  { name: "mobile-430x932", viewport: { width: 430, height: 932 } },
  { name: "tablet-768x1024", viewport: { width: 768, height: 1024 } },
  { name: "desktop-1440x1000", viewport: { width: 1440, height: 1000 } },
];

export default defineConfig({
  testDir: "./visual-tests",
  outputDir: "./test-results/visual",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}",
  fullyParallel: true,
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixelRatio: 0.01 } },
  use: {
    baseURL: "http://127.0.0.1:4174",
    browserName: "chromium",
    colorScheme: "light",
    reducedMotion: "reduce",
  },
  projects: viewports.map(({ name, viewport }) => ({ name, use: { viewport } })),
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4174",
    url: "http://127.0.0.1:4174/visual-tests.html",
    reuseExistingServer: !process.env.CI,
  },
});
