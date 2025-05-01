import { test, expect } from '@playwright/test';

test('Website Title', async ({ page }) => {
  await page.goto('https://mariumdeu.wixsite.com/assessment');
  const title = await page.title();
  expect(title).toContain('Weather Condition App');
});