import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 5px;

    & > label {
      background-color: ${theme.colors.hex.white};
      border: 1px solid rgba(${theme.colors.rgb.black}, 0.2);
      border-radius: 3px;

      display: flex;

      & > input {
        padding: 10px 15px;
        font-size: 15px;

        background-color: transparent;
        border: none;
        width: 100%;

        outline: none;
      }
    }
  `}
`;
