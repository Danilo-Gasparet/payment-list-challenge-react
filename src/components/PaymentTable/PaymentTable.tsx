import { ReactNode } from "react";
import { I18N } from "../../i18n/i18n";
import { getLocale } from "../../utils/locale";
import { Payment } from "../../api/schemas/payments";
import { formatAmount, formatDate } from "../../utils/formatters";
import { StatusBadge } from "../shared-ui/StatusBadge";
import {
  Table,
  TableWrapper,
  TableHeaderWrapper,
  TableHeaderRow,
  TableHeader,
  TableBodyWrapper,
  TableRow,
  TableCell,
} from "./styles";
import { VisuallyHidden } from "../shared-ui/VisuallyHidden";

type ColumnConfig = {
  key: keyof Payment;
  header: string;
  render: (payment: Payment, locale?: string) => ReactNode;
};

const columnConfig = [
  {
    key: "id",
    header: I18N.TABLE_HEADER_PAYMENT_ID,
    render: (payment) => payment.id,
  },
  {
    key: "date",
    header: I18N.TABLE_HEADER_DATE,
    render: (payment) => formatDate(payment.date),
  },
  {
    key: "amount",
    header: I18N.TABLE_HEADER_AMOUNT,
    render: (payment, locale) => formatAmount(payment.amount, locale),
  },
  {
    key: "customerName",
    header: I18N.TABLE_HEADER_CUSTOMER,
    render: (payment) => payment.customerName,
  },
  {
    key: "currency",
    header: I18N.TABLE_HEADER_CURRENCY,
    render: (payment) => payment.currency,
  },
  {
    key: "status",
    header: I18N.TABLE_HEADER_STATUS,
    render: (payment) => (
      <StatusBadge status={payment.status}>{payment.status}</StatusBadge>
    ),
  },
] satisfies ColumnConfig[];

interface PaymentTableProps {
  payments: Payment[];
}

export const PaymentTable = ({ payments }: PaymentTableProps) => {
  const locale = getLocale();

  return (
    <TableWrapper>
      <Table>
        <caption>
          <VisuallyHidden>{I18N.TABLE_CAPTION}</VisuallyHidden>
        </caption>

        <TableHeaderWrapper>
          <TableHeaderRow>
            {columnConfig.map((column) => (
              <TableHeader key={column.key} scope="col">
                {column.header}
              </TableHeader>
            ))}
          </TableHeaderRow>
        </TableHeaderWrapper>

        <TableBodyWrapper>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              {columnConfig.map((column) => (
                <TableCell key={column.key}>
                  {column.render(payment, locale)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBodyWrapper>
      </Table>
    </TableWrapper>
  );
};
