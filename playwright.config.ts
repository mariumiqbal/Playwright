import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Folder where your test files are located
  testDir: "./tests",

  // Maximum time one test can run (in milliseconds)
  timeout: 30_000,

  // Retry failed tests once
  retries: 1,

  use: {
    // Run tests in headed mode (browser visible)
    headless: false,

    // Default viewport size
    viewport: { width: 1280, height: 720 },

    // Timeout for actions like click/fill
    actionTimeout: 5_000,

    // Trace for debugging on first retry
    trace: "on-first-retry",
  },

  // Optional: run tests in multiple browsers
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
