import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 26px;
`;
