import { PaymentResponseSchema, PaymentsParams } from "../../schemas/payments";
import { API_URL } from "../constants/payments";
import { PaymentsResponse } from "../types/payments";

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

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw createFetchError(response.statusText, response.status);
  }

  const data = await response.json();

  return PaymentResponseSchema.parse(data);
};
