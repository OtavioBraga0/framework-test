import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { Home } from "../../pages/Home";

import { renderWithRouterAndRedux } from "../helpers/renderWith";
import { useProduct } from "../../hooks/useProduct";
import {
  PRODUCTS_TITLE_TEST_ID,
  PRODUCT_ITEM_TEST_ID,
  SKELETON_LOADING_TEST_ID,
} from "../helpers/constants";
import { mockedProducts, mockedUser } from "../helpers/mockedData";

afterEach(cleanup);

jest.mock("../../hooks/useProduct");

describe("Home Screen", () => {
  test("Should be render", async () => {
    useProduct.mockReturnValue({
      loading: false,
      products: [],
      actions: {
        handleGetAllProducts: jest.fn(),
      },
    });

    renderWithRouterAndRedux(<Home />, {
      initialState: {
        user: mockedUser,
      },
    });

    expect(screen.getByTestId(PRODUCTS_TITLE_TEST_ID)).toBeTruthy();
  });

  test("Should render loading skeleton when products are being fetched", () => {
    useProduct.mockReturnValue({
      loading: true,
      products: [],
      actions: {
        handleGetAllProducts: jest.fn(),
      },
    });

    renderWithRouterAndRedux(<Home />);

    expect(screen.getByTestId(SKELETON_LOADING_TEST_ID)).toBeTruthy();
    expect(screen.queryByTestId(PRODUCT_ITEM_TEST_ID)).toBeNull();
  });

  test("Should render products when products are fetched", () => {
    useProduct.mockReturnValue({
      loading: false,
      products: mockedProducts,
      actions: {
        handleGetAllProducts: jest.fn(),
      },
    });

    renderWithRouterAndRedux(<Home />);

    expect(screen.queryByTestId(SKELETON_LOADING_TEST_ID)).toBeNull();
    expect(screen.getAllByTestId(PRODUCT_ITEM_TEST_ID)).toHaveLength(5);
  });
});
