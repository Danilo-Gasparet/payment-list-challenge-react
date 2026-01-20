import styled from "styled-components";

export const PendingBox = styled.div<{ isPending?: boolean }>`
  opacity: ${({ isPending }) => (isPending ? 0.4 : 1)};
  transition: opacity 0.2s;
`;
