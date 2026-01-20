import { Suspense } from "react";
import { I18N } from "../i18n/i18n";
import { Container } from "../components/shared-ui/Container";
import { Title } from "../components/shared-ui/Title";
import { EmptyBox } from "../components/shared-ui/EmptyBox";
import { Spinner } from "../components/shared-ui/Spinner";
import { LoadingBox } from "../components/shared-ui/LoadingBox";
import { PaymentTable } from "../components/PaymentTable/PaymentTable";
import { usePayments } from "../hooks/usePayments";
import { VisuallyHidden } from "../components/shared-ui/VisuallyHidden";

export const PaymentsList = () => {
  const { data } = usePayments();

  if (data.payments.length === 0) {
    return <EmptyBox role="status">{I18N.NO_PAYMENTS_FOUND}</EmptyBox>;
  }

  return <PaymentTable payments={data.payments} />;
};

export function Payments() {
  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <Suspense
        fallback={
          <LoadingBox role="status" aria-live="polite">
            <Spinner aria-hidden="true" />
            <VisuallyHidden>{I18N.LOADING_PAYMENTS}</VisuallyHidden>
          </LoadingBox>
        }
      >
        <PaymentsList />
      </Suspense>
    </Container>
  );
}
