import styled from "styled-components";

export const FilterRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;

  &:focus {
    border-color: rgb(61, 70, 83);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: rgb(61, 70, 83);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: rgb(61, 108, 209);
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(33, 65, 154);
  }
`;

export const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6b7280;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4b5563;
  }
`;
