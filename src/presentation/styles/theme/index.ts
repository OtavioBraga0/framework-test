import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const theme = {
  colors,
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${theme.colors.hex.gray.light};
  }

  * {
    font-family: "Montserrat", sans-serif;
  }

  main {
    padding: 30px;
    max-width: 990px;
    margin: 0 auto;
  }

`;
