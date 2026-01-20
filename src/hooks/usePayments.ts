import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchPayments } from "../api/fetchers/payments";
import { PaymentsParams } from "../schemas/params";

export const usePayments = (params: PaymentsParams) => {
  return useSuspenseQuery({
    queryKey: ["payments", params],
    queryFn: () => fetchPayments(params),
    staleTime: 30 * 1000,
  });
};
