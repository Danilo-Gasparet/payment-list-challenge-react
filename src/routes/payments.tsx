import { Suspense } from "react";
import { I18N } from "../i18n/i18n";
import { Container } from "../components/shared-ui/Container";
import { Title } from "../components/shared-ui/Title";
import { EmptyBox } from "../components/shared-ui/EmptyBox";
import { Spinner } from "../components/shared-ui/Spinner";
import { LoadingBox } from "../components/shared-ui/LoadingBox";
import { PendingBox } from "../components/shared-ui/PendingBox";
import { PaymentFilters } from "../components/PaymentFilters/PaymentFilters";
import { PaymentTable } from "../components/PaymentTable/PaymentTable";
import { usePaymentParams } from "../hooks/usePaymentParams";
import { usePayments } from "../hooks/usePayments";
import { VisuallyHidden } from "../components/shared-ui/VisuallyHidden";

interface PaymentsListProps {
  paymentParams: ReturnType<typeof usePaymentParams>;
}

export const PaymentsList = ({ paymentParams }: PaymentsListProps) => {
  const { data } = usePayments(paymentParams.params);
  const { isPending } = paymentParams;

  if (data.payments.length === 0) {
    return <EmptyBox role="status">{I18N.NO_PAYMENTS_FOUND}</EmptyBox>;
  }

  return (
    <PendingBox isPending={isPending}>
      <PaymentTable payments={data.payments} />
    </PendingBox>
  );
};

export function Payments() {
  const paymentParams = usePaymentParams();

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentFilters paymentParams={paymentParams} />

      <Suspense
        fallback={
          <LoadingBox role="status" aria-live="polite">
            <Spinner aria-hidden="true" />

            <VisuallyHidden>{I18N.LOADING_PAYMENTS}</VisuallyHidden>
          </LoadingBox>
        }
      >
        <PaymentsList paymentParams={paymentParams} />
      </Suspense>
    </Container>
  );
}
