import React, { ButtonHTMLAttributes } from "react";
import { Loading } from "../Loading";

import * as ButtonStyle from "./style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...rest
}) => {
  return (
    <ButtonStyle.Wrapper
      {...rest}
      type={!loading ? "submit" : "button"}
      className={loading ? "activated" : ""}
      disabled={loading}
    >
      {!loading ? children : <Loading />}
    </ButtonStyle.Wrapper>
  );
};
