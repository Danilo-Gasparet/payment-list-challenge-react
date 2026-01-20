// API constants - types are derived from schemas in api/schemas/payments.ts
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

export const PAYMENT_STATUSES = [
  "completed",
  "pending",
  "failed",
  "refunded",
] as const;
