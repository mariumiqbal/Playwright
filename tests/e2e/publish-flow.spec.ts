import { test, expect, chromium } from "@playwright/test";

test.describe("Pantheon Content Publisher - Publish Flow", () => {
  test("full publish flow using real Chrome profile", async () => {
    test.setTimeout(180000); // 3 minutes
    const userDataDir =
      "C:\\Users\\13319\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2";

    //  --- Step 0: Launch Chrome using your real profile ---
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: "chrome", // use installed Chrome
      headless: false, // show browser
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const page = await context.newPage();

    // Goto Google Docs
    await page.goto("https://docs.google.com/");

    // Create a new document
    await page.goto("https://docs.new");
    await page.waitForSelector(".kix-appview-editor");
    const testContent = `Automated Test ${Date.now()}`; // Unique content every time script will run
    await page.keyboard.type(testContent);

    //  --- Step 1: Open Pantheon Content Publisher Add-on ---
    await page.locator(".kix-page-paginated").click();
    await page
      .getByRole("tab", { name: "Pantheon" })
      .locator("div")
      .nth(2)
      .click();

    //  --- Step 2: Publish using the Add-on ---
    await page
      .getByLabel("Add-on content shows.")
      .locator("iframe")
      .contentFrame()
      .getByRole("img", { name: "Allow access" })
      .click();

    // Click Allow in the Google Permissions popup
    await page.getByRole("button", { name: "Allow" }).click({ timeout: 5000 });

    // Connect to Playground
    await page
      .getByLabel("Add-on content shows.")
      .locator("iframe")
      .contentFrame()
      .getByRole("img", { name: "Connect to playground" })
      .click({ timeout: 10000 });

    await page
      .getByLabel("Add-on content shows.")
      .locator("iframe")
      .contentFrame()
      .getByRole("img", { name: "Go to playground" })
      .click({ timeout: 10000 });

    await page
      .getByLabel("Add-on content shows.")
      .locator("iframe")
      .contentFrame()
      .locator("div")
      .filter({ hasText: /^-$/ })
      .first()
      .click();

    // Click Publish
    await page
      .getByLabel("Add-on content shows.")
      .locator("iframe")
      .contentFrame()
      .getByRole("button", { name: "PUBLISH", exact: true })
      .click({ timeout: 10000 });

    const pagePromise = context.waitForEvent("page");

    // Get the new page object
    const popupWindow = await pagePromise;

    // Wait for the new page to load
    await popupWindow.waitForLoadState();

    await popupWindow.setViewportSize({ width: 1280, height: 720 });

    // Confirm Publish in the popup
    await popupWindow.getByRole("button", { name: "Publish" }).click();

    // Click View Live Content
    const page2Promise = popupWindow.waitForEvent("popup");
    await popupWindow
      .getByRole("button", { name: "View Live Content" })
      .click();
    const publishedPage = await page2Promise;

    // Verify published content appears on the site
    await publishedPage.waitForSelector("p.normal-text span", {
      timeout: 10000,
    });
    await expect(publishedPage.locator("p.normal-text span")).toHaveText(
      testContent
    );

    console.log("✅ Verified published content on live page:", testContent);

    await context.close();
  });
});
