import { I18N } from "../../i18n/i18n";
import { usePaymentParams } from "../../hooks/usePaymentParams";
import { PaginationRow, PaginationButton } from "./styles";

interface PaymentPaginationProps {
  paymentParams: ReturnType<typeof usePaymentParams>;
  totalPages: number;
}

export const PaymentPagination = ({
  paymentParams,
  totalPages,
}: PaymentPaginationProps) => {
  const { params, updateParams } = paymentParams;
  const currentPage = params.page;

  const handlePrevious = () => {
    if (currentPage > 1) {
      updateParams({ page: currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      updateParams({ page: currentPage + 1 });
    }
  };

  return (
    <nav aria-label="Pagination">
      <PaginationRow>
        <PaginationButton onClick={handlePrevious} disabled={currentPage === 1}>
          {I18N.PREVIOUS_BUTTON}
        </PaginationButton>

        <span aria-live="polite">
          {I18N.PAGE_LABEL} {currentPage} {I18N.PAGE_LABEL_OF} {totalPages}
        </span>

        <PaginationButton
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          {I18N.NEXT_BUTTON}
        </PaginationButton>
      </PaginationRow>
    </nav>
  );
};
