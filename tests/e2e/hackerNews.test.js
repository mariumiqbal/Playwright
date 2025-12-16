import { test, expect } from "@playwright/test";

test.describe("Hacker News E2E Tests", () => {
  test("Hacker News newest 100 articles are sorted newest to oldest", async ({
    page,
  }) => {
    await page.goto("https://news.ycombinator.com/newest");
    let timestamps = []; // Array to hold UNIX timestamps
    let articleAges = [];
    const now = Date.now(); // Get current time in milliseconds

    while (articleAges.length < 100) {
      // Get article ages from the "age" links
      // The age links contain text like "1 hour ago", "2 days ago", etc.
      const articleAge = await page.$$eval(".subtext .age > a", (links) => {
        return links.map((link) => link.innerText);
      });
      articleAges.push(...articleAge);

      if (articleAges.length < 100) {
        await Promise.all([
          page.waitForSelector("a.morelink"),
          page.click("a.morelink"),
        ]);
      }
    }
    // Trim to exactly 100 in case we got extra
    articleAges = articleAges.slice(0, 100);

    // Convert article ages to UNIX timestamps
    timestamps = articleAges.map((time) => {
      const [age, unit] = time.split(" ");
      const value = parseInt(age, 10);
      let ageMs = 0;
      if (unit.startsWith("minute")) {
        ageMs = value * 60 * 1000;
      } else if (unit.startsWith("hour")) {
        ageMs = value * 60 * 60 * 1000;
      } else if (unit.startsWith("day")) {
        ageMs = value * 24 * 60 * 60 * 1000;
      } else {
        console.warn(`Unknown time unit in "${ageText}"`);
      }

      return now - ageMs;
    });

    // Verify timestamps are sorted newest → oldest
    for (let i = 0; i < timestamps.length - 1; i++) {
      expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i + 1]);
    }
  });
});
