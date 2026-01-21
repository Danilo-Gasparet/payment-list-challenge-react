import { createContext, useContext } from "react";
import { usePaymentParams } from "../hooks/usePaymentParams";

export type PaymentParamsContextValue = ReturnType<typeof usePaymentParams>;

export const PaymentParamsContext =
  createContext<PaymentParamsContextValue | null>(null);

export function usePaymentParamsContext() {
  const context = useContext(PaymentParamsContext);

  if (!context) {
    throw new Error(
      "usePaymentParamsContext must be used within a PaymentParamsProvider"
    );
  }

  return context;
}
