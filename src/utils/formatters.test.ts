import { describe, it, expect } from "vitest";
import { formatDate, formatAmount } from "./formatters";

describe("formatters", () => {
  describe("formatDate", () => {
    it("formats ISO date string to dd/MM/yyyy, HH:mm:ss", () => {
      const result = formatDate("2024-01-15T10:30:00Z");
      // Note: Result depends on timezone, so we check the format pattern
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    });

    it("handles midnight correctly", () => {
      const result = formatDate("2024-06-01T00:00:00Z");
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    });

    it("handles end of day correctly", () => {
      const result = formatDate("2024-12-31T23:59:59Z");
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}$/);
    });
  });

  describe("formatAmount", () => {
    it("formats integer as decimal with 2 decimal places", () => {
      const result = formatAmount(100, "en-US");
      expect(result).toBe("100.00");
    });

    it("formats decimal with 2 decimal places", () => {
      const result = formatAmount(99.99, "en-US");
      expect(result).toBe("99.99");
    });

    it("rounds to 2 decimal places", () => {
      const result = formatAmount(100.999, "en-US");
      expect(result).toBe("101.00");
    });

    it("adds thousand separators for large numbers", () => {
      const result = formatAmount(1234567.89, "en-US");
      expect(result).toBe("1,234,567.89");
    });

    it("handles zero", () => {
      const result = formatAmount(0, "en-US");
      expect(result).toBe("0.00");
    });

    it("handles negative numbers", () => {
      const result = formatAmount(-500.5, "en-US");
      expect(result).toBe("-500.50");
    });

    it("uses locale-specific formatting", () => {
      const resultUS = formatAmount(1234.56, "en-US");
      const resultDE = formatAmount(1234.56, "de-DE");

      expect(resultUS).toBe("1,234.56");
      expect(resultDE).toBe("1.234,56");
    });
  });
});
