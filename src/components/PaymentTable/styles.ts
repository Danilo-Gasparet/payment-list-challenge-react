import styled from "styled-components";

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background-color: white;
  margin-top: 1.5rem;
`;

export const Table = styled.table`
  min-width: 100%;
  text-sm: 14px;
  text-align: left;
`;

export const TableHeaderWrapper = styled.thead`
  background-color: #f9fafb;
`;

export const TableHeaderRow = styled.tr`
  border-bottom: 2px solid #e5e7eb;
`;

export const TableHeader = styled.th`
  padding: 1rem;
  font-weight: 600;
  background-color: #f3f4f6;
`;

export const TableBodyWrapper = styled.tbody`
  background-color: white;
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #4b5563;
`;
