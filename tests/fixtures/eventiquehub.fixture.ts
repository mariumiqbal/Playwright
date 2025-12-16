import { test as base, expect } from "@playwright/test";
import { EventiqueHubPage } from "../pages/EventiqueHubPage";
import { AirtableAPI } from "../api/airtable.api";

type Fixtures = {
  airtableAPI: AirtableAPI;
  eventiqueHubPage: EventiqueHubPage;
};

export const test = base.extend<Fixtures>({
  airtableAPI: async ({ request }, use) => {
    await use(new AirtableAPI(request));
  },

  eventiqueHubPage: async ({ page }, use) => {
    const hubPage = new EventiqueHubPage(page);
    await hubPage.gotoHome();
    await use(hubPage);
  },
});

export { expect };
