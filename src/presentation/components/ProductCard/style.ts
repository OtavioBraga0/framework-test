import styled, { css } from "styled-components";

export const ProductCardWrapper = styled.div`
  width: 200px;
  min-height: 200px;
  margin: 0 auto;

  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.1s linear;
`;

export const ContainerWrapper = styled.div`
  ${({ theme }) => css`
    transform-style: preserve-3d;
    transition: transform linear 0.5s, opacity linear 0.1s, filter linear 0.1s;
    position: relative;
    width: 100%;
    height: 100%;

    z-index: 100;

    -webkit-box-shadow: 5px 5px 7px -1px rgba(${theme.colors.rgb.black}, 0.3);
    box-shadow: 5px 5px 7px -1px rgba(${theme.colors.rgb.black}, 0.3);

    border-radius: 10px;
    overflow: hidden;
    & > img {
      width: 100%;
      background-color: ${theme.colors.hex.white};
    }
  `}
`;

export const Info = styled.div`
  ${({ theme }) => css`
    padding: 10px;
    flex-grow: 1;
    width: calc(100% - 20px);

    display: flex;
    flex-direction: column;

    gap: 10px;

    margin: 20px 0;

    & > h3,
    & > p {
      margin: 0;
    }

    & > h3 {
      color: ${theme.colors.hex.primary.dark};
    }

    & > p {
      color: rgba(${theme.colors.rgb.secondary}, 0.7);
      font-size: 14px;
    }
  `}
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    margin: 0;
  }
`;
