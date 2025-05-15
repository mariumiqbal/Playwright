import { test, expect } from "@playwright/test";

test.describe("Dev Portfolio E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://mariumiqbal.github.io/dev-portfolio");
  });

  test("should render the homepage", async ({ page }) => {
    await expect(page).toHaveTitle(/This is my portfolio project/i);
    await expect(
      page.getByRole("heading", { name: /I'm Marium/i })
    ).toBeVisible();
  });

  test("should navigate to Projects section and list projects", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /projects/i }).click();
    const projects = page.getByRole("link", { name: /View project/i });
    await expect(projects).toHaveCount(2);
  });

  test("should navigate to Contact section", async ({ page }) => {
    await page.getByRole("link", { name: /contact/i }).click();
    await expect(
      page.getByRole("link", { name: /marium.deu@gmail.com/i })
    ).toBeVisible();
  });
});
