import { ReactNode } from "react";
import { usePaymentParams } from "../hooks/usePaymentParams";
import { PaymentParamsContext } from "./PaymentParamsContext";

export function PaymentParamsProvider({ children }: { children: ReactNode }) {
  const paymentParams = usePaymentParams();

  return (
    <PaymentParamsContext.Provider value={paymentParams}>
      {children}
    </PaymentParamsContext.Provider>
  );
}
