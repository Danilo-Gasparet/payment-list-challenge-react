import { useSearchParams } from "react-router";
import { useTransition } from "react";
import { PaymentsParamsSchema } from "../schemas/payments";
import { PaymentsParams } from "../api/types/payments";
import { logger } from "../utils/logger";

export const usePaymentParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const params = PaymentsParamsSchema.parse(
    Object.fromEntries(searchParams.entries())
  );

  const updateParams = (updates: Partial<PaymentsParams>) => {
    logger.info("Params update", { updates });

    const nextParams = new URLSearchParams(searchParams);
    const updatedParams = { ...params, ...updates };

    const isChangingCriteria = "search" in updates || "currency" in updates;
    if (isChangingCriteria) {
      updatedParams.page = 1;
    }

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    startTransition(() => {
      setSearchParams(nextParams);
    });
  };

  return {
    params,
    updateParams,
    isPending,
    hasActiveCriteria: Boolean(params.search || params.currency),
  };
};
