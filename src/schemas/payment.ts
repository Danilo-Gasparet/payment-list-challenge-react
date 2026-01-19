import { z } from "zod";

export const CurrencySchema = z.enum([
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "ZAR",
  "JPY",
  "CZK",
]);

export const PaymentStatusSchema = z.enum([
  "completed",
  "pending",
  "failed",
  "refunded",
]);

export const PaymentSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  amount: z.number(),
  customerAddress: z.string(),
  currency: CurrencySchema,
  status: PaymentStatusSchema,
  date: z.string(),
  description: z.string(),
});

export const PaymentSearchParamsSchema = z.object({
  search: z.string().optional(),
  currency: CurrencySchema.optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export const PaymentSearchResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
