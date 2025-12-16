import "dotenv/config";
import { test, expect } from "../fixtures/eventiquehub.fixture";

test("Vendor exists in Airtable and appears on EventiqueHub UI", async ({
  airtableAPI,
  eventiqueHubPage,
}) => {
  const baseId = process.env.AIRTABLE_BASE_ID!;
  const tableName = process.env.AIRTABLE_TABLE_NAME!;
  const token = process.env.AIRTABLE_TOKEN_READ!;
  const FIELD_NAME = "Business Name";
  const EXPECTED_VALUE = "Threadsandlaces";

  // 1️⃣ Verify backend data via Airtable API
  const record = await airtableAPI.getVendorByBusinessName(
    baseId,
    tableName,
    token,
    FIELD_NAME,
    EXPECTED_VALUE
  );
  expect(record.fields.Email).toBe("pakboutiqueinusa@gmail.com");

  // 2️⃣ Verify vendor appears in UI
  await eventiqueHubPage.gotoBrowseVendor();
  await eventiqueHubPage.searchVendor(EXPECTED_VALUE);
  await eventiqueHubPage.verifyVendorVisible(EXPECTED_VALUE);
});
