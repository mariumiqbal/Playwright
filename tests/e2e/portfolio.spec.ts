import { test, expect } from "../fixtures/portfolio.fixture";

test.describe("Dev Portfolio E2E Tests", () => {
  test("should render the homepage", async ({ portfolioPage }) => {
    await portfolioPage.goto();

    await expect(portfolioPage.page).toHaveTitle(
      /This is my portfolio project/i
    );
    await expect(portfolioPage.heading).toBeVisible();
  });

  test("should navigate to Projects section and list projects", async ({
    portfolioPage,
  }) => {
    await portfolioPage.goto();
    await portfolioPage.navigateToProjects();

    await expect(portfolioPage.projectCards).toHaveCount(2);
  });

  test("should navigate to Contact section", async ({ portfolioPage }) => {
    await portfolioPage.goto();
    await portfolioPage.navigateToContact();

    await expect(portfolioPage.emailLink).toBeVisible();
  });
});
