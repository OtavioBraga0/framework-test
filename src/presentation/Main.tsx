import React from "react";
import { Provider } from "react-redux";
import { EngageStore } from "../domain/DomainLayer";
import { Router } from "./Router";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles/theme";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export type MainProps = {
  store: EngageStore;
};

export const Main: React.FC<MainProps> = (props: MainProps) => {
  const { store } = props;
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <Router />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
};
