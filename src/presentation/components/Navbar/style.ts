import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 0;

  max-width: 990px;
  margin: 0 auto;

  & > img {
    height: 100%;
  }
`;

export const Menu = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  & > img {
    cursor: pointer;
  }
`;

type CartProps = {
  open: boolean;
};

export const Cart = styled.section<CartProps>`
  ${({ theme, open }) => css`
    position: fixed;
    top: 0;
    right: ${open ? 0 : `-100%`};
    bottom: 0;
    width: 400px;

    transition: right 0.5s ease-in-out;

    z-index: 3;

    background-color: ${theme.colors.hex.white};

    padding: 15px;

    -webkit-box-shadow: -5px 0px 17px 0px rgba(${theme.colors.rgb.black}, 0.75);
    -moz-box-shadow: -5px 0px 17px 0px rgba(${theme.colors.rgb.black}, 0.75);
    box-shadow: -5px 0px 17px 0px rgba(${theme.colors.rgb.black}, 0.75);
  `}
`;

export const CartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartBody = styled.div`
  display: flex;
  flex-direction: column;

  & > h2 {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & > p {
    text-align: center;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  & > img {
    width: 75px;
    height: 75px;
    object-fit: cover;
  }
`;

export const CartItemDescription = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    width: 100%;

    & > h3 {
      margin: 0;
    }

    & > span {
      font-size: 12px;

      &.cart__unitValue {
        margin-top: -5px;
        opacity: 0.5;
        margin-left: 10px;
      }
    }
  `}
`;
