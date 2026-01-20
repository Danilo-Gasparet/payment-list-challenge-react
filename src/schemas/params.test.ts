import { describe, it, expect } from "vitest";
import { SearchSchema, PaginationSchema } from "./params";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../api/constants/payments";

describe("schemas/params", () => {
  describe("SearchSchema", () => {
    it("parses valid search string", () => {
      const result = SearchSchema.parse({ search: "pay_123" });
      expect(result.search).toBe("pay_123");
    });

    it("trims whitespace from search string", () => {
      const result = SearchSchema.parse({ search: "  pay_123  " });
      expect(result.search).toBe("pay_123");
    });

    it("returns undefined for empty search string", () => {
      const result = SearchSchema.parse({ search: "" });
      expect(result.search).toBeUndefined();
    });

    it("returns undefined for whitespace-only search", () => {
      const result = SearchSchema.parse({ search: "   " });
      expect(result.search).toBeUndefined();
    });

    it("allows missing search field", () => {
      const result = SearchSchema.parse({});
      expect(result.search).toBeUndefined();
    });
  });

  describe("PaginationSchema", () => {
    it("parses valid page and pageSize", () => {
      const result = PaginationSchema.parse({ page: 2, pageSize: 10 });
      expect(result.page).toBe(2);
      expect(result.pageSize).toBe(10);
    });

    it("coerces string page to number", () => {
      const result = PaginationSchema.parse({ page: "3", pageSize: "15" });
      expect(result.page).toBe(3);
      expect(result.pageSize).toBe(15);
    });

    it("uses default page when invalid", () => {
      const result = PaginationSchema.parse({ page: "invalid", pageSize: 5 });
      expect(result.page).toBe(DEFAULT_PAGE);
    });

    it("uses default pageSize when invalid", () => {
      const result = PaginationSchema.parse({ page: 1, pageSize: "invalid" });
      expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });

    it("uses default for negative page", () => {
      const result = PaginationSchema.parse({ page: -1, pageSize: 5 });
      expect(result.page).toBe(DEFAULT_PAGE);
    });

    it("uses default for zero page", () => {
      const result = PaginationSchema.parse({ page: 0, pageSize: 5 });
      expect(result.page).toBe(DEFAULT_PAGE);
    });

    it("uses default for pageSize over 100", () => {
      const result = PaginationSchema.parse({ page: 1, pageSize: 101 });
      expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });

    it("accepts pageSize of exactly 100", () => {
      const result = PaginationSchema.parse({ page: 1, pageSize: 100 });
      expect(result.pageSize).toBe(100);
    });

    it("uses defaults when fields are missing", () => {
      const result = PaginationSchema.parse({});
      expect(result.page).toBe(DEFAULT_PAGE);
      expect(result.pageSize).toBe(DEFAULT_PAGE_SIZE);
    });
  });
});
