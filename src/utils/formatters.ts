import { format } from "date-fns";

/**
 * Format date according to test requirements: dd/MM/yyyy, HH:mm:ss
 */
export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd/MM/yyyy, HH:mm:ss");
};

/**
 * Format amount as decimal with 2 decimal places (no currency symbol).
 * Uses locale-aware thousand separators.
 */
export const formatAmount = (amount: number, locale?: string) => {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
