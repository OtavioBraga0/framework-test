import React from "react";
import { cleanup, fireEvent, screen } from "@testing-library/react";
import { Login } from "../../pages/Login";
import { renderWithRouterAndRedux } from "../helpers/renderWith";
import {
  EMAIL_INPUT_TEST_ID,
  PASSWORD_INPUT_TEST_ID,
  SUBMIT_BTN_TEST_ID,
} from "../helpers/constants";

const mockedUsedNavigate = jest.fn();

const VALID_EMAIL = `otavio@gmail.com`;
const VALID_PASSWORD = `123123123`;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

afterEach(cleanup);

const mockHistoryReplace = jest.fn();

describe("Login Screen", () => {
  test("Should be render", () => {
    renderWithRouterAndRedux(<Login />);

    expect(screen.getByTestId(EMAIL_INPUT_TEST_ID)).toBeTruthy();
    expect(screen.getByTestId(PASSWORD_INPUT_TEST_ID)).toBeTruthy();
  });

  test("Should be change email and password values", () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.queryByTestId(EMAIL_INPUT_TEST_ID);
    const passwordInput = screen.queryByTestId(PASSWORD_INPUT_TEST_ID);

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    expect(emailInput.value).toBe(VALID_EMAIL);

    fireEvent.change(passwordInput, { target: { value: VALID_PASSWORD } });
    expect(passwordInput.value).toBe(VALID_PASSWORD);

    fireEvent.click(screen.queryByTestId(SUBMIT_BTN_TEST_ID));
  });
});
