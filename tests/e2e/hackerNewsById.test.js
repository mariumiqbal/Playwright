import { test, expect } from "@playwright/test";

test.describe("Hacker News E2E Tests", () => {
  test("Hacker News newest 100 articles are sorted newest to oldest", async ({
    page,
  }) => {
    await page.goto("https://news.ycombinator.com/newest");

    let timestamps = [];

    while (timestamps.length < 100) {
      // Get UNIX times from age links (they link to item?id=, get the id)
      const pageTimestamps = await page.$$eval(".subtext .age > a", (links) => {
        return links
          .map((link) => {
            const match = link.href.match(/id=(\d+)/);
            return match ? parseInt(match[1], 10) : null;
          })
          .filter(Boolean);
      });

      timestamps.push(...pageTimestamps);

      if (timestamps.length < 100) {
        await Promise.all([
          page.waitForSelector("a.morelink"),
          page.click("a.morelink"),
        ]);
      }
    }

    timestamps = timestamps.slice(0, 100);

    // Check that timestamps are in descending order
    for (let i = 0; i < timestamps.length - 1; i++) {
      expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i + 1]);
    }
  });
});
