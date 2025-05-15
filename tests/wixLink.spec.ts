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

test("should show weather result for entered city", async ({ page }) => {
  // Type a city name
  await page.getByPlaceholder("Enter city").fill("New York");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  // Wait for the result container to appear
  const result = page.locator("#comp-m9tcd689");
  await expect(result).toBeVisible({ timeout: 10000 });

  // Validate city name
  await expect(page.getByText(/New York/i)).toBeVisible({ timeout: 10000 });

  // Validate temperature (basic check)
  await expect(result).toContainText("F");
});

test("should not show weather result for an invalid city", async ({ page }) => {
  await page.getByPlaceholder("Enter city").fill("invalidname");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  await expect(page.getByText("Could not retrieve weather data.")).toBeVisible({
    timeout: 10000,
  });
});

test("should toggle between Fahrenheit and Celsius", async ({ page }) => {
  await page.getByPlaceholder("Enter city").fill("New York");

  const celsuis = await page.locator("#comp-m9q88wm4").isVisible();
  await page.getByRole("radio", { name: "C" }).click({ force: true });

  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  const result = page.locator("#comp-m9tcd689");
  await expect(result).toBeVisible({ timeout: 10000 });
  await expect(page.getByText(/New York/i)).toBeVisible({ timeout: 10000 });
  // Validate Temperature
  await expect(result).toContainText("C");

  // Toggle to Fahrenheit and validating result in F
  await page.getByRole("radio", { name: "F" }).click({ force: true });

  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  await expect(page.locator("#comp-m9tcd689")).toContainText("F");
});

test('should allow user to check "Save as Favorite"', async ({ page }) => {
  await page.getByPlaceholder("Enter city").fill("Paris");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  // Wait for the result container to appear
  const result = page.locator("#comp-m9tcd689");
  await expect(result).toBeVisible({ timeout: 10000 });

  const checkbox = page.locator('input[type="checkbox"]');
  await expect(checkbox).toBeVisible();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});

test("should not allow weather fetch on empty input", async ({ page }) => {
  await page.getByPlaceholder("Enter city").fill("");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Enter" }).click();

  // Expect no weather result shown
  await expect(page.locator("#comp-m9tcd689")).not.toBeVisible({
    timeout: 5000,
  });
});
