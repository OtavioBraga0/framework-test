const hex = {
  primary: { normal: "#004382", dark: "#1D1839" },
  secondary: "#603474",
  tertiary: "#0DC2E6",
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    light: "#f4f5f7",
    normal: "#ececec",
    dark: "#cccccc",
  },
};

const rgb: { [key: string]: string | { [key: string | number]: string } } = {
  primary: { normal: "0, 67, 130", dark: "29, 24, 57" },
  secondary: "96, 52, 116",
  tertiary: "13, 194, 230",
  white: "255, 255, 255",
  black: "0, 0, 0",
  gray: {
    light: "244, 245, 247",
  },
};

export const colors = {
  hex,
  rgb,
};

export default colors;
