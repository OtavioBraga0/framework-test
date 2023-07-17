import React from "react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { store } from "../../../domain/DomainLayer";
import { theme } from "../../styles/theme";

function withTheme(component) {
  return <ThemeProvider theme={theme}>{component}</ThemeProvider>;
}

function withRouter(component, history) {
  return withTheme(<MemoryRouter history={history}>{component}</MemoryRouter>);
}

function withRedux(component, customStore) {
  const mockedStore = {
    ...store,
    customStore,
  };
  return withTheme(<Provider store={mockedStore}>{component}</Provider>);
}

export function renderWithTheme(component) {
  return render(withTheme(component));
}

export function renderWithRouter(
  component,
  {
    initialEntries = ["/"],
    history = createMemoryHistory({ initialEntries }),
  } = {}
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRedux(component) {
  return render(withRedux(component));
}

export function renderWithRouterAndRedux(component, options = {}) {
  const {
    initialEntries = ["/"],
    history = createMemoryHistory({ initialEntries }),
  } = options;

  return {
    ...renderWithRedux(withRouter(component, history), options),
    history,
  };
}
