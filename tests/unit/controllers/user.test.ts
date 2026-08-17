import { describe, it, expect } from "vitest";

describe("Pagination utilities", () => {
  it("should parse default pagination values", async () => {
    const { parsePagination } = await import("../../../middlewares/pagination.middleware.js");
    const result = parsePagination({});

    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.skip).toBe(0);
  });

  it("should parse custom pagination values", async () => {
    const { parsePagination } = await import("../../../middlewares/pagination.middleware.js");
    const result = parsePagination({ page: "3", limit: "20" });

    expect(result.page).toBe(3);
    expect(result.limit).toBe(20);
    expect(result.skip).toBe(40);
  });

  it("should cap limit at 100", async () => {
    const { parsePagination } = await import("../../../middlewares/pagination.middleware.js");
    const result = parsePagination({ limit: "500" });

    expect(result.limit).toBe(100);
  });

  it("should enforce minimum page of 1", async () => {
    const { parsePagination } = await import("../../../middlewares/pagination.middleware.js");
    const result = parsePagination({ page: "-5" });

    expect(result.page).toBe(1);
  });
});
