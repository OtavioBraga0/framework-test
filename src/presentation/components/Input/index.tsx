import React, { InputHTMLAttributes } from "react";

import * as InputStyle from "./style";

interface InputProp extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProp> = ({ label, ...rest }) => {
  return (
    <InputStyle.Wrapper>
      {label}
      <label>
        <input {...rest} />
      </label>
    </InputStyle.Wrapper>
  );
};
