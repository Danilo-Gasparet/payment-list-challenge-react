import { z } from "zod";
import { CURRENCIES, PAYMENT_STATUSES } from "../api/constants/payments";
import { PaginationSchema, SearchSchema } from "./params";

export const CurrencySchema = z.enum(CURRENCIES);

export const PaymentStatusSchema = z.enum(PAYMENT_STATUSES);

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

export const PaymentResponseSchema = z.object({
  payments: z.array(PaymentSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export const PaymentsFilterSchema = z.object({
  currency: z
    .preprocess((val) => String(val).toUpperCase(), CurrencySchema)
    .optional()
    .catch(undefined),
});

export const PaymentsParamsSchema = z.object({
  ...PaginationSchema.shape,
  ...SearchSchema.shape,
  ...PaymentsFilterSchema.shape,
});

export type PaymentsParams = z.infer<typeof PaymentsParamsSchema>;
