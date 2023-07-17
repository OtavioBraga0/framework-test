import React, { ReactElement } from "react";

import * as LoadingStyle from "./style";

const PulseLoading: React.FC = () => {
  const dots = Array(3).fill("");

  return (
    <LoadingStyle.PulseWrapper data-testid="spinner_loading_test_id">
      {dots.map((dot, index) => (
        <span key={index} />
      ))}
    </LoadingStyle.PulseWrapper>
  );
};

type LoadingProps = {
  type?: "pulse" | "login";
};

export const Loading: React.FC<LoadingProps> = ({ type = "pulse" }) => {
  const loadingType: { [key: string]: ReactElement } = {
    pulse: <PulseLoading />,
  };

  return loadingType[type];
};
