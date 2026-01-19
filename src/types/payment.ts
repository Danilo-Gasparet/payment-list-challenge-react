// Currency types
export type Currency = "USD" | "EUR" | "GBP" | "AUD" | "CAD" | "ZAR" | "JPY" | "CZK";

// Payment status types
export type PaymentStatus = "completed" | "pending" | "failed" | "refunded";

// Payment entity
export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: string;
  status: string;
  date: string;
  description: string;
}

// API request parameters
export interface PaymentSearchParams {
  search?: string;
  currency?: string;
  page?: number;
  pageSize?: number;
}

// API response
export interface PaymentSearchResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
