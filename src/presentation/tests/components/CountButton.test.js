import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { CountButton } from "../../components/CountButton";
import { renderWithTheme } from "../helpers/renderWith";
import { ADD_BTN_TEST_ID, REMOVE_BTN_TEST_ID } from "../helpers/constants";

describe("CountButton", () => {
  test("Should call onChange with the correct value when clicking add and remove buttons", () => {
    const mockOnChange = jest.fn();

    renderWithTheme(<CountButton onChange={mockOnChange} quantity={3} />);

    const addButton = screen.getByTestId(ADD_BTN_TEST_ID);
    const removeButton = screen.getByTestId(REMOVE_BTN_TEST_ID);

    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(mockOnChange).toHaveBeenCalledTimes(3);

    fireEvent.click(removeButton);
    fireEvent.click(removeButton);

    expect(mockOnChange).toHaveBeenCalledTimes(5);
  });
});
