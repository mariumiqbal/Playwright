import "dotenv/config";
import { test, expect } from "@playwright/test";

// ---------- CONFIGURE AIRTABLE VALUES ----------
// Check Airtable API docs: https://airtable.com/api
// https://airtable.com/{appXXXXXXXXXXXXXX}/api/docs

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID; // e.g. 'appXXXXXXXXXXXXXX'
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_NAME!; // exact table name in Airtable
const FIELD_NAME = "Business Name"; // the field you want to check
const EXPECTED_VALUE = "Threadsandlaces"; // the value you expect to find

test("Airtable API returns expected record", async () => {
  const token = process.env.AIRTABLE_TOKEN_READ;
  if (!token) throw new Error("AIRTABLE_TOKEN env variable is missing");

  const endpoint = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_TABLE
  )}`;

  // filterByFormula finds only records where FIELD_NAME equals EXPECTED_VALUE
  const filter = encodeURIComponent(`{${FIELD_NAME}} = '${EXPECTED_VALUE}'`);

  const res = await fetch(`${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log("Status:", res.status, res.statusText);
  const data = await res.json();
  console.log("Response body:", data.records[0].fields);

  expect(res.ok).toBeTruthy(); // HTTP 2xx

  // const data = await res.json();
  console.log("Records returned:", data.records.length);
  const record = data.records.find(
    (r: { fields: Record<string, any> }) =>
      r.fields[FIELD_NAME] === EXPECTED_VALUE
  );

  // ✅ Check that at least one record matches the expected value
  expect(
    record,
    `No record found where ${FIELD_NAME} = ${EXPECTED_VALUE}`
  ).toBeTruthy();
  expect(record.fields[FIELD_NAME]).toBe(EXPECTED_VALUE);
  expect(record?.fields["Email"]).toBe("pakboutiqueinusa@gmail.com");
});
