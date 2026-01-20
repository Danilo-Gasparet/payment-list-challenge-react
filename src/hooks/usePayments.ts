import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api/fetchers/payments";
import { PaymentsParams } from "../schemas/payments";

export const usePayments = (filters: PaymentsParams) => {
  return useSuspenseQuery({
    queryKey: ["payments", filters],
    queryFn: async ({ signal }) => {
      // DELETE ME | DEMO ONLY: 2s delay to simulate slow network
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchPayments(filters, signal);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};
