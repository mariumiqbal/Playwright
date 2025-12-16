import { chromium } from "@playwright/test";

(async () => {
  const context = await chromium.launchPersistentContext(
    "C:\\Users\\13319\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 2",
    {
      headless: false,
      channel: "chrome",
      args: ["--disable-blink-features=AutomationControlled"],
    }
  );

  // For macOS, use:
  // Microsoft Edge: '/Users/YourUsername/Library/Application Support/Microsoft Edge'
  // Google Chrome:  '/Users/YourUsername/Library/Application Support/Google/Chrome'

  const page = context.pages()[0];

  await page.pause(); // This will open Codegen if needed

  await context.close();
})();
