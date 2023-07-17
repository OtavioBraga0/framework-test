import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "../../components/ProductCard";
import { useCart } from "../../hooks/useCart";
import { mockedProduct } from "../helpers/mockedData";
import { renderWithTheme } from "../helpers/renderWith";
import { ADD_BTN_TEST_ID } from "../helpers/constants";

jest.mock("../../hooks/useCart");

describe("ProductCard", () => {
  test("Should render product details and add button when product is not in the cart", () => {
    useCart.mockReturnValue({
      cart: [],
      actions: {
        handleChangeQuantity: jest.fn(),
        handleAddProduct: jest.fn(),
      },
    });

    renderWithTheme(<ProductCard {...mockedProduct} />);

    expect(screen.getByText("Maçã")).toBeTruthy();
    expect(screen.getByText("R$ 10.00")).toBeTruthy();

    const addButton = screen.getByTestId(ADD_BTN_TEST_ID);
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);

    const { handleAddProduct } = useCart.mock.results[0].value.actions;

    expect(handleAddProduct).toHaveBeenCalledWith(mockedProduct);
  });

  test("Should render product details and quantity buttons when product is in the cart", () => {
    useCart.mockReturnValue({
      cart: [
        {
          product: mockedProduct,
          quantity: 2,
          subtotal: 20,
        },
      ],
      actions: {
        handleChangeQuantity: jest.fn(),
        handleAddProduct: jest.fn(),
      },
    });

    renderWithTheme(<ProductCard {...mockedProduct} />);

    expect(screen.getByText("Maçã")).toBeTruthy();
    expect(screen.getByText("R$ 10.00")).toBeTruthy();

    const addButton = screen.getByTestId(ADD_BTN_TEST_ID);
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);

    const { handleChangeQuantity } = useCart.mock.results[0].value.actions;

    expect(handleChangeQuantity).toHaveBeenCalledWith(1, 1);
  });
});
