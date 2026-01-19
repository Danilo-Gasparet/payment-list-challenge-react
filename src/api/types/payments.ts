import { Currency, PaymentStatus } from "../constants/payments";

// Payment entity
export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: Currency;
  status: PaymentStatus;
  date: string;
  description: string;
}

// API request parameters
export interface PaymentSearchParams {
  search?: string;
  currency?: Currency;
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
