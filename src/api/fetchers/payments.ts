import { PaymentsParams } from "../../schemas/params";
import { PaymentResponseSchema, PaymentsResponse } from "../schemas/payments";
import { API_URL } from "../constants/payments";
import { logger } from "../../utils/logger";

export const createFetchError = (message: string, status: number) =>
  Object.assign(new Error(message), { status });

export type FetchError = ReturnType<typeof createFetchError>;

export const isFetchError = (error: unknown): error is FetchError =>
  error instanceof Error && "status" in error;

export const fetchPayments = async (
  params: PaymentsParams,
  signal?: AbortSignal
): Promise<PaymentsResponse> => {
  const url = new URL(API_URL, window.location.origin);

  if (params.search) url.searchParams.set("search", params.search);
  if (params.currency) url.searchParams.set("currency", params.currency);

  url.searchParams.set("page", String(params.page));
  url.searchParams.set("pageSize", String(params.pageSize));

  logger.info("API request", { page: params.page, currency: params.currency });

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    logger.error("API error", { status: response.status });
    throw createFetchError(response.statusText, response.status);
  }

  const data = await response.json();
  const parsed = PaymentResponseSchema.parse(data);

  logger.info("API response", { count: parsed.payments.length, total: parsed.total });

  return parsed;
};
