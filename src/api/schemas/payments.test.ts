import { describe, it, expect } from "vitest";
import {
  CurrencySchema,
  PaymentStatusSchema,
  PaymentSchema,
  PaymentResponseSchema,
} from "./payments";

describe("api/schemas/payments", () => {
  describe("CurrencySchema", () => {
    it.each(["USD", "EUR", "GBP", "AUD", "CAD", "ZAR", "JPY", "CZK"])(
      "accepts valid currency: %s",
      (currency) => {
        const result = CurrencySchema.parse(currency);
        expect(result).toBe(currency);
      }
    );

    it("rejects invalid currency", () => {
      expect(() => CurrencySchema.parse("INVALID")).toThrow();
    });
  });

  describe("PaymentStatusSchema", () => {
    it.each(["completed", "pending", "failed", "refunded"])(
      "accepts valid status: %s",
      (status) => {
        const result = PaymentStatusSchema.parse(status);
        expect(result).toBe(status);
      }
    );

    it("rejects invalid status", () => {
      expect(() => PaymentStatusSchema.parse("unknown")).toThrow();
    });
  });

  describe("PaymentSchema", () => {
    const validPayment = {
      id: "pay_123",
      customerName: "John Doe",
      amount: 100.5,
      customerAddress: "123 Main St",
      currency: "USD",
      status: "completed",
      date: "2024-01-15T10:30:00Z",
      description: "Test payment",
    };

    it("parses valid payment", () => {
      const result = PaymentSchema.parse(validPayment);
      expect(result).toEqual(validPayment);
    });

    it("rejects payment with missing fields", () => {
      const { id: _id, ...incomplete } = validPayment;
      expect(() => PaymentSchema.parse(incomplete)).toThrow();
    });

    it("rejects payment with invalid currency", () => {
      expect(() =>
        PaymentSchema.parse({ ...validPayment, currency: "INVALID" })
      ).toThrow();
    });

    it("rejects payment with invalid status", () => {
      expect(() =>
        PaymentSchema.parse({ ...validPayment, status: "unknown" })
      ).toThrow();
    });
  });

  describe("PaymentResponseSchema", () => {
    const validResponse = {
      payments: [
        {
          id: "pay_123",
          customerName: "John Doe",
          amount: 100.5,
          customerAddress: "123 Main St",
          currency: "USD",
          status: "completed",
          date: "2024-01-15T10:30:00Z",
          description: "Test payment",
        },
      ],
      total: 10,
      page: 1,
      pageSize: 5,
    };

    it("parses valid response", () => {
      const result = PaymentResponseSchema.parse(validResponse);
      expect(result.payments).toHaveLength(1);
      expect(result.total).toBe(10);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    it("accepts empty payments array", () => {
      const result = PaymentResponseSchema.parse({
        ...validResponse,
        payments: [],
        total: 0,
      });
      expect(result.payments).toHaveLength(0);
    });

    it("rejects response with missing fields", () => {
      const { total: _total, ...incomplete } = validResponse;
      expect(() => PaymentResponseSchema.parse(incomplete)).toThrow();
    });
  });
});
