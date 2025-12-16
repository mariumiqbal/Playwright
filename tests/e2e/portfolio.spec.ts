import { test, expect } from "../fixtures/portfolio.fixture";

test.describe("Dev Portfolio E2E Tests", () => {
  test("should render the homepage", async ({ portfolioPage }) => {
    await portfolioPage.verifyHomePage();
  });

  test("should navigate to Projects section and list projects", async ({
    portfolioPage,
  }) => {
    await portfolioPage.navigateToProjects();
    await portfolioPage.verifyProjectsCount(2);
  });

  test("should navigate to Contact section", async ({ portfolioPage }) => {
    await portfolioPage.navigateToContact();
    await portfolioPage.verifyContactEmailVisible();
  });
});
