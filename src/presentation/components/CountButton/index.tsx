import React from "react";

import { FaMinus, FaPlus } from "react-icons/fa";

import * as CountButtonStyle from "./style";
import { Button } from "../Button";

type CountButtonProps = {
  onChange: (quantity: number) => void;
  quantity: number;
};

export const CountButton: React.FC<CountButtonProps> = ({
  onChange,
  quantity,
}) => {
  return (
    <CountButtonStyle.Container>
      <Button
        data-testid="remove_btn_test_id"
        style={{ width: 35 }}
        onClick={() => onChange(-1)}
      >
        <FaMinus />
      </Button>
      <span>{quantity}</span>
      <Button
        data-testid="add_btn_test_id"
        style={{ width: 35 }}
        onClick={() => onChange(1)}
      >
        <FaPlus />
      </Button>
    </CountButtonStyle.Container>
  );
};
