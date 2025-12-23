// pages/PortfolioPage.ts
import { Page, Locator } from "@playwright/test";

export class PortfolioPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly projectsLink: Locator;
  readonly contactLink: Locator;
  readonly projectCards: Locator;
  readonly emailLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /I'm Marium/i });
    this.projectsLink = page.getByRole("link", { name: /projects/i });
    this.contactLink = page.getByRole("link", { name: /contact/i });
    this.projectCards = page.getByRole("link", { name: /View project/i });
    this.emailLink = page.getByRole("link", {
      name: /marium.deu@gmail.com/i,
    });
  }

  async goto() {
    await this.page.goto("https://mariumiqbal.github.io/dev-portfolio");
  }

  async navigateToProjects() {
    await this.projectsLink.click();
  }

  async navigateToContact() {
    await this.contactLink.click();
  }
}
