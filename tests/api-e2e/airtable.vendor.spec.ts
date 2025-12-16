import "dotenv/config";
import { test, expect } from "@playwright/test";
import { AirtableAPI } from "../api/airtable.api";

test.describe("EventiqueHub API-Only E2E", () => {
  test("Vendor exists in Airtable with correct email", async ({ request }) => {
    const airtableAPI = new AirtableAPI(request);

    const baseId = process.env.AIRTABLE_BASE_ID!;
    const tableName = process.env.AIRTABLE_TABLE_NAME!;
    const token = process.env.AIRTABLE_TOKEN_READ!;
    const FIELD_NAME = "Business Name";
    const EXPECTED_VALUE = "Threadsandlaces";

    // 1️⃣ Fetch vendor via API
    const record = await airtableAPI.getVendorByBusinessName(
      baseId,
      tableName,
      token,
      FIELD_NAME,
      EXPECTED_VALUE
    );

    // 2️⃣ Assert email
    expect(record.fields.Email).toBe("pakboutiqueinusa@gmail.com");

    console.log(`✅ Vendor "${EXPECTED_VALUE}" exists with correct email`);
  });
});
