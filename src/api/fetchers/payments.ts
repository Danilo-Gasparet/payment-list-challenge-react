import { PaymentResponseSchema } from "../../schemas/payments";
import { API_URL } from "../constants/payments";
import { PaymentsResponse } from "../types/payments";

export const createFetchError = (message: string, status: number) =>
  Object.assign(new Error(message), { status });

export type FetchError = ReturnType<typeof createFetchError>;

export const isFetchError = (error: unknown): error is FetchError =>
  error instanceof Error && "status" in error;

export const fetchPayments = async (
  signal?: AbortSignal
): Promise<PaymentsResponse> => {
  const url = new URL(API_URL, window.location.origin);

  url.searchParams.set("page", "1");
  url.searchParams.set("pageSize", "5");

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw createFetchError(response.statusText, response.status);
  }

  const data = await response.json();

  return PaymentResponseSchema.parse(data);
};
