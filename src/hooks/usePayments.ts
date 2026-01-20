import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api/fetchers/payments";

export const usePayments = () => {
  return useSuspenseQuery({
    queryKey: ["payments"],
    queryFn: async ({ signal }) => {
      // DELETE ME | DEMO ONLY: 2s delay to simulate slow network
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchPayments(signal);
    },
    staleTime: 30 * 1000, // 30 seconds
  });
};
