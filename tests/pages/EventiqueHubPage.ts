import { Page, Locator, expect } from "@playwright/test";

export class EventiqueHubPage {
  readonly page: Page;
  readonly browseVendorLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browseVendorLink = page.getByRole("link", { name: /browse vendor/i });
    this.searchInput = page.getByPlaceholder(/search/i);
  }

  async gotoHome() {
    await this.page.goto("https://eventiquehub.softr.app/", {
      waitUntil: "networkidle",
      timeout: 30000,
    });
  }

  async gotoBrowseVendor() {
    await this.browseVendorLink.click();
    await this.searchInput.waitFor({ timeout: 10000 });
  }

  async searchVendor(name: string) {
    await this.searchInput.fill(name);
    await this.page.keyboard.press("Enter");
  }

  async verifyVendorVisible(name: string) {
    await expect(this.page.getByText(name, { exact: false })).toBeVisible({
      timeout: 15000,
    });
  }
}
