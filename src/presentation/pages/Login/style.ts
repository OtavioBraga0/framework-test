import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  border-radius: 7px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ImageWrapper = styled.div`
  width: 455px;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  z-index: 1;
  height: 550px;
`;

export const Background = styled.img`
  z-index: 0;
  height: 70%;
  position: absolute;
  top: 50%;
  left: 0;
  right: -100px;
  transform: translateY(-50%);
`;

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 30px;
    z-index: 1;

    background-color: ${theme.colors.hex.white};

    padding: 40px;

    width: 400px;

    -webkit-box-shadow: 5px 5px 13px -6px rgba(${theme.colors.rgb.black}, 0.8);
    box-shadow: 5px 5px 13px -6px rgba(${theme.colors.rgb.black}, 0.8);

    border-radius: 7px;

    & > button {
      height: 35px;
      width: 100%;

      align-self: flex-end;

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
    }

    label {
      width: 400px;
    }
  `}
`;
