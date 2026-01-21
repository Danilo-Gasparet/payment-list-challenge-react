import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { I18N } from "../i18n/i18n";
import { Container } from "../components/shared-ui/Container";
import { Title } from "../components/shared-ui/Title";
import { EmptyBox } from "../components/shared-ui/EmptyBox";
import { Spinner } from "../components/shared-ui/Spinner";
import { ErrorBox } from "../components/shared-ui/ErrorBox";
import { LoadingBox } from "../components/shared-ui/LoadingBox";
import { PendingBox } from "../components/shared-ui/PendingBox";
import { PaymentFilters } from "../components/PaymentFilters/PaymentFilters";
import { PaymentTable } from "../components/PaymentTable/PaymentTable";
import { PaymentPagination } from "../components/PaymentPagination/PaymentPagination";
import { PaymentParamsProvider } from "../context/PaymentParamsProvider";
import { usePaymentParamsContext } from "../context/PaymentParamsContext";
import { usePayments } from "../hooks/usePayments";
import { isFetchError } from "../api/fetchers/payments";
import { VisuallyHidden } from "../components/shared-ui/VisuallyHidden";

const getErrorMessage = (error: unknown): string => {
  if (isFetchError(error)) {
    if (error.status === 404) return I18N.PAYMENT_NOT_FOUND;
    if (error.status === 500) return I18N.INTERNAL_SERVER_ERROR;
  }

  return I18N.SOMETHING_WENT_WRONG;
};

const PaymentsList = () => {
  const { params, isPending } = usePaymentParamsContext();
  const { data } = usePayments(params);

  if (data.payments.length === 0) {
    return <EmptyBox role="status">{I18N.NO_PAYMENTS_FOUND}</EmptyBox>;
  }

  const totalPages = Math.ceil(data.total / data.pageSize);

  return (
    <PendingBox $isPending={isPending}>
      <PaymentTable payments={data.payments} />

      {totalPages > 1 && <PaymentPagination totalPages={totalPages} />}
    </PendingBox>
  );
};

const PaymentsContent = () => {
  const { params } = usePaymentParamsContext();

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <PaymentFilters />

      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorBox role="alert">{getErrorMessage(error)}</ErrorBox>
        )}
        resetKeys={[params.search, params.currency, params.page]}
      >
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
      </ErrorBoundary>
    </Container>
  );
};

export function Payments() {
  return (
    <PaymentParamsProvider>
      <PaymentsContent />
    </PaymentParamsProvider>
  );
}
