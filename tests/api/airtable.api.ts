import { APIRequestContext, expect } from "@playwright/test";

export class AirtableAPI {
  constructor(private request: APIRequestContext) {}

  async getVendorByBusinessName(
    baseId: string,
    tableName: string,
    token: string,
    fieldName: string,
    expectedValue: string
  ) {
    const endpoint = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName
    )}`;
    const res = await this.request.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    expect(res.ok()).toBeTruthy();

    const data = await res.json();
    const record = data.records.find(
      (r: { fields: Record<string, any> }) =>
        r.fields[fieldName] === expectedValue
    );

    expect(
      record,
      `No record found where ${fieldName} = ${expectedValue}`
    ).toBeTruthy();
    return record;
  }
}
