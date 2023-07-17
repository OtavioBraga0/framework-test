import styled, { css } from "styled-components";

export const Wrapper = styled.button`
  ${({ theme }) => css`
    height: 35px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(${theme.colors.rgb.secondary}, 0.7);

    transition: background-color 0.2s linear, color 0.2s linear;
    background-color: ${theme.colors.hex.gray.light};
    color: ${theme.colors.hex.primary.dark};

    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover,
    &.activated {
      background-color: ${theme.colors.hex.secondary};
      color: ${theme.colors.hex.white};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background-color: ${theme.colors.hex.gray.light};
        color: ${theme.colors.hex.primary.dark};
      }
    }
  `}
`;
