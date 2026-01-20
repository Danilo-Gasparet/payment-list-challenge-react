import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../api/constants/payments";
import { CurrencySchema } from "../api/schemas/payments";

// App-level schemas for validating and transforming user input (URL params, forms)

export const SearchSchema = z.object({
  search: z.string().trim().min(1).optional().catch(undefined),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).catch(DEFAULT_PAGE),
  pageSize: z.coerce.number().int().min(1).max(100).catch(DEFAULT_PAGE_SIZE),
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
