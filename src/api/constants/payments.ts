// In future, these two URL constants could be moved to a shared /endpoints/{api} file
export const API_URL = "/api/payments";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 5;

export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "ZAR",
  "JPY",
  "CZK",
] as const;

export type Currency = (typeof CURRENCIES)[number];

export const PAYMENT_STATUSES = [
  "completed",
  "pending",
  "failed",
  "refunded",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
