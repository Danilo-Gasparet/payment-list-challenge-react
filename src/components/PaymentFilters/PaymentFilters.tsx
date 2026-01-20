import { useState } from "react";
import { I18N } from "../../i18n/i18n";

import { FilterRow, SearchInput, SearchButton } from "./styles";
import { usePaymentParams } from "../../hooks/usePaymentParams";

interface PaymentFiltersProps {
  paymentParams: ReturnType<typeof usePaymentParams>;
}
export function PaymentFilters({ paymentParams }: PaymentFiltersProps) {
  const { params, updateParams } = paymentParams;

  const [draftSearch, setDraftSearch] = useState(params.search ?? "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    updateParams({ search: draftSearch || undefined });
  };

  return (
    <form onSubmit={handleSubmit} aria-label={I18N.SEARCH_AND_FILTERS_FORM}>
      <FilterRow>
        <SearchInput
          type="text"
          placeholder={I18N.SEARCH_PLACEHOLDER}
          value={draftSearch}
          onChange={(event) => setDraftSearch(event.target.value)}
          aria-label={I18N.SEARCH_LABEL}
        />

        <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
      </FilterRow>
    </form>
  );
}
