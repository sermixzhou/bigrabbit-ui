import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/p1-visual-tests.html");
  await page.evaluate(() => document.fonts.ready);
});

test("P1 responsive default composition", async ({ page }) => {
  await expect(page).toHaveScreenshot("p1-default.png", { fullPage: true });
});

test("P1 responsive navigation state", async ({ page }) => {
  if ((page.viewportSize()?.width ?? 0) >= 768) await page.getByRole("button", { name: /产品/ }).click();
  else await page.locator("summary").filter({ hasText: "产品" }).click();
  await expect(page).toHaveScreenshot("p1-navigation-open.png", { fullPage: true });
});

test("P1 drawer state", async ({ page }) => {
  await page.getByRole("button", { name: "打开抽屉" }).click();
  await expect(page.getByRole("dialog", { name: "学习设置" })).toBeVisible();
  await expect(page).toHaveScreenshot("p1-drawer-open.png");
});

test("P1 alert dialog state", async ({ page }) => {
  await page.getByRole("button", { name: "危险确认" }).click();
  await expect(page.getByRole("alertdialog", { name: "删除记录？" })).toBeVisible();
  await expect(page).toHaveScreenshot("p1-alert-open.png");
});
