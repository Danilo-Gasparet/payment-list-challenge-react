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
export interface PaymentsParams {
  search?: string;
  currency?: Currency;
  page?: number;
  pageSize?: number;
}

// API response
export interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}
