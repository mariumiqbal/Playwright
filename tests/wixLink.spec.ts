import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://mariumdeu.wixsite.com/weather");
});

test("Website Title", async ({ page }) => {
  // Locate title of the page
  const title = await page.title();
  // Assert that title is matching
  await expect(title).toContain("Weather Condition App");
});

test("City Label Text", async ({ page }) => {
  // Locate the label with text 'Enter city below'
  const cityLabel = page.getByText("Enter city below", { exact: true });

  // Assert that the label is visible
  await expect(cityLabel).toBeVisible();
});

test("City Input Text", async ({ page }) => {
  //Locate the text box
  const cityInput = page.locator("input#input_comp-m9q5vpmm");
  await expect(cityInput).toHaveAttribute("placeholder", "Enter city name");

  //Type city in text box
  await cityInput.fill("Chicago");
});
