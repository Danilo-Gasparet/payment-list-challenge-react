import { z } from "zod";
import { CURRENCIES, PAYMENT_STATUSES } from "../constants/payments";

// API Contract Schemas - tightly coupled to the API specification

export const CurrencySchema = z.enum(CURRENCIES);

export type Currency = z.infer<typeof CurrencySchema>;

export const PaymentStatusSchema = z.enum(PAYMENT_STATUSES);

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

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

export type Payment = z.infer<typeof PaymentSchema>;

export const PaymentResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type PaymentsResponse = z.infer<typeof PaymentResponseSchema>;
