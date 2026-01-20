import { useState } from "react";
import { I18N } from "../../i18n/i18n";
import { CURRENCIES } from "../../api/constants/payments";
import { CurrencySchema } from "../../schemas/payments";
import { logger } from "../../utils/logger";
import {
  FilterRow,
  SearchInput,
  Select,
  SearchButton,
  ClearButton,
} from "./styles";
import { usePaymentParams } from "../../hooks/usePaymentParams";

interface PaymentFiltersProps {
  paymentParams: ReturnType<typeof usePaymentParams>;
}
export function PaymentFilters({ paymentParams }: PaymentFiltersProps) {
  const { params, updateParams, hasActiveCriteria } = paymentParams;

  const [draftSearch, setDraftSearch] = useState(params.search ?? "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    logger.info("Search submitted", { hasSearchTerm: Boolean(draftSearch) });

    updateParams({ search: draftSearch || undefined });
  };

  const handleCurrencyChange = (value: string) => {
    const parsed = CurrencySchema.safeParse(value);
    logger.info("Currency filter changed", { currency: parsed.success ? parsed.data : "all" });

    updateParams({ currency: parsed.success ? parsed.data : undefined });
  };

  const handleClearFilters = () => {
    logger.info("Filters cleared");
    setDraftSearch("");

    updateParams({ search: undefined, currency: undefined });
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

        <Select
          value={params.currency ?? ""}
          onChange={(event) => handleCurrencyChange(event.target.value)}
          aria-label={I18N.CURRENCY_FILTER_LABEL}
        >
          <option value="">{I18N.CURRENCIES_OPTION}</option>

          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>

        <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>

        {hasActiveCriteria && (
          <ClearButton type="button" onClick={handleClearFilters}>
            {I18N.CLEAR_FILTERS}
          </ClearButton>
        )}
      </FilterRow>
    </form>
  );
}
