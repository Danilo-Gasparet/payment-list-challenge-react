import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../api/constants/payments";

export const SearchSchema = z.object({
  search: z.string().trim().min(1).optional().catch(undefined),
});

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).catch(DEFAULT_PAGE),
  pageSize: z.coerce.number().int().min(1).max(100).catch(DEFAULT_PAGE_SIZE),
});
