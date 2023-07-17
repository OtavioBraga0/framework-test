import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { renderWithRedux } from "../helpers/renderWith";
import {
  ADD_BTN_TEST_ID,
  BUY_BTN_TEST_ID,
  CART_ITEM_TEST_ID,
  CLOSE_CART_BTN_TEST_ID,
  EMPTY_CART_TITLE_TEST_ID,
  OPEN_CART_BTN_TEST_ID,
  REMOVE_BTN_TEST_ID,
  SUBTOTAL_CART_ITEM_TEST_ID,
  TOTAL_CART_TEST_ID,
} from "../helpers/constants";
import { mockedCart, mockedUser } from "../helpers/mockedData";

import "@testing-library/jest-dom/extend-expect";

jest.mock("../../hooks/useAuth");
jest.mock("../../hooks/useCart");

describe("Navbar", () => {
  test("Should display user avatar and cart when logged in", () => {
    useAuth.mockReturnValue({
      user: mockedUser,
      actions: {
        handleSignOut: jest.fn(),
      },
    });

    useCart.mockReturnValue({
      cart: mockedCart,
      total: 20,
      actions: {
        handleChangeQuantity: jest.fn(),
        handleFinishSale: jest.fn(),
      },
    });

    renderWithRedux(<Navbar />);

    const userAvatar = screen.getByAltText("Otávio Braga");
    expect(userAvatar).toBeTruthy();

    const cartButton = screen.getByTestId(OPEN_CART_BTN_TEST_ID);
    expect(cartButton).toBeTruthy();

    fireEvent.click(cartButton);

    const cartItem = screen.getByTestId(CART_ITEM_TEST_ID);
    expect(cartItem).toBeTruthy();
    expect(screen.getByText("Maçã")).toBeTruthy();
    expect(screen.getByText("R$ 10.00/unit.")).toBeTruthy();
    expect(screen.getByText("Subtotal: R$ 20.00")).toBeTruthy();

    const total = screen.getByTestId(TOTAL_CART_TEST_ID);
    expect(total).toBeTruthy();
    expect(screen.getByText("Total: R$ 20.00")).toBeTruthy();

    const buyButton = screen.getByTestId(BUY_BTN_TEST_ID);
    expect(buyButton).toBeTruthy();
  });

  test("Should display empty cart message when cart is empty", () => {
    useAuth.mockReturnValue({
      user: mockedUser,
      actions: {
        handleSignOut: jest.fn(),
      },
    });

    useCart.mockReturnValue({
      cart: [],
      total: 0,
      actions: {
        handleChangeQuantity: jest.fn(),
        handleFinishSale: jest.fn(),
      },
    });

    renderWithRedux(<Navbar />);

    const userAvatar = screen.getByAltText("Otávio Braga");
    expect(userAvatar).toBeTruthy();

    const cartButton = screen.getByTestId(OPEN_CART_BTN_TEST_ID);
    expect(cartButton).toBeTruthy();

    fireEvent.click(cartButton);

    const emptyCartMessage = screen.getByTestId(EMPTY_CART_TITLE_TEST_ID);
    expect(emptyCartMessage).toBeTruthy();

    const total = screen.getByTestId(TOTAL_CART_TEST_ID);
    expect(total).toBeTruthy();
    expect(screen.getByText("Total: R$ 0.00")).toBeTruthy();

    const buyButton = screen.getByTestId(BUY_BTN_TEST_ID);
    expect(buyButton).toBeTruthy();
  });

  test("Should close cart when click on X button", () => {
    useAuth.mockReturnValue({
      user: mockedUser,
      actions: {
        handleSignOut: jest.fn(),
      },
    });

    useCart.mockReturnValue({
      cart: [],
      total: 0,
      actions: {
        handleChangeQuantity: jest.fn(),
        handleFinishSale: jest.fn(),
      },
    });

    renderWithRedux(<Navbar />);

    const closeButton = screen.getByTestId(CLOSE_CART_BTN_TEST_ID);
    fireEvent.click(closeButton);
  });

  test("Should update product quantity", () => {
    useAuth.mockReturnValue({
      user: mockedUser,
      actions: {
        handleSignOut: jest.fn(),
      },
    });

    useCart.mockReturnValue({
      cart: mockedCart,
      total: 20,
      actions: {
        handleChangeQuantity: jest.fn(),
        handleFinishSale: jest.fn(),
      },
    });

    renderWithRedux(<Navbar />);

    const userAvatar = screen.getByAltText("Otávio Braga");
    expect(userAvatar).toBeTruthy();

    const cartButton = screen.getByTestId(OPEN_CART_BTN_TEST_ID);
    expect(cartButton).toBeTruthy();

    fireEvent.click(cartButton);

    const cartItem = screen.getByTestId(CART_ITEM_TEST_ID);
    expect(cartItem).toBeTruthy();
    expect(screen.getByText("Maçã")).toBeTruthy();
    expect(screen.getByText("R$ 10.00/unit.")).toBeTruthy();
    expect(screen.getByText("Subtotal: R$ 20.00")).toBeTruthy();

    const total = screen.getByTestId(TOTAL_CART_TEST_ID);
    expect(total).toBeTruthy();
    expect(screen.getByTestId(TOTAL_CART_TEST_ID)).toHaveTextContent(
      `Total: R$ 20.00`
    );

    const addButton = screen.getByTestId(ADD_BTN_TEST_ID);

    fireEvent.click(addButton);

    expect(screen.getByTestId(SUBTOTAL_CART_ITEM_TEST_ID)).toHaveTextContent(
      "Subtotal: R$ 20.00"
    );

    expect(screen.getByTestId(TOTAL_CART_TEST_ID)).toHaveTextContent(
      `Total: R$ 20.00`
    );

    const removeButton = screen.getByTestId(REMOVE_BTN_TEST_ID);
    fireEvent.click(removeButton);

    expect(screen.getByTestId(SUBTOTAL_CART_ITEM_TEST_ID)).toHaveTextContent(
      "Subtotal: R$ 20.00"
    );

    expect(screen.getByTestId(TOTAL_CART_TEST_ID)).toHaveTextContent(
      `Total: R$ 20.00`
    );
  });
});
