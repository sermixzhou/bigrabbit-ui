import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/visual-tests.html");
  await page.evaluate(() => document.fonts.ready);
});

test("core default, disabled, selected, error and loading states", async ({ page }) => {
  await expect(page).toHaveScreenshot("core-states.png", { fullPage: true });
});

test("dropdown collision and portal state", async ({ page }) => {
  await page.getByRole("button", { name: "菜单", exact: true }).click();
  await expect(page).toHaveScreenshot("dropdown-open.png", { fullPage: true });
});

test("popover collision and portal state", async ({ page }) => {
  await page.getByRole("button", { name: "弹层", exact: true }).click();
  await expect(page).toHaveScreenshot("popover-open.png", { fullPage: true });
});

test("tooltip focus state", async ({ page }) => {
  await page.getByRole("button", { name: "提示", exact: true }).focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await expect(page).toHaveScreenshot("tooltip-open.png", { fullPage: true });
});

test("select listbox state", async ({ page }) => {
  await page.getByRole("combobox", { name: "城市", exact: true }).click();
  await expect(page).toHaveScreenshot("select-open.png", { fullPage: true });
});

test("combobox listbox state", async ({ page }) => {
  await page.getByRole("combobox", { name: "搜索城市" }).focus();
  await expect(page).toHaveScreenshot("combobox-open.png", { fullPage: true });
});
