import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { Button } from "../../components/Button";
import { renderWithTheme } from "../helpers/renderWith";

const BTN_TEST_ID = "btn_test_id";
const SPINNER_LOADING_TEST_ID = "spinner_loading_test_id";

describe("Button", () => {
  test("Should render button with text when not loading", () => {
    renderWithTheme(<Button data-testid={BTN_TEST_ID}>Click Me</Button>);

    const button = screen.getByTestId(BTN_TEST_ID);
    expect(button).toBeTruthy();
  });

  test("Should render loading spinner when loading", () => {
    renderWithTheme(<Button loading>Loading...</Button>);

    const loadingSpinner = screen.getByTestId(SPINNER_LOADING_TEST_ID);
    expect(loadingSpinner).toBeTruthy();
  });

  test("Should call onClick function when clicked", () => {
    const onClickMock = jest.fn();
    renderWithTheme(
      <Button data-testid={BTN_TEST_ID} onClick={onClickMock}>
        Click Me
      </Button>
    );

    const button = screen.getByTestId(BTN_TEST_ID);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  test("Should not call onClick function when clicked and loading", () => {
    const onClickMock = jest.fn();
    renderWithTheme(
      <Button loading data-testid={BTN_TEST_ID} onClick={onClickMock}>
        Click Me
      </Button>
    );

    const button = screen.getByTestId(BTN_TEST_ID);
    fireEvent.click(button);

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
