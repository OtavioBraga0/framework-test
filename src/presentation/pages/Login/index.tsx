import React from "react";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";

import * as LoginStyle from "./style";
import { Loading } from "../../components/Loading";

export const Login: React.FC = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    actions: { handleSubmit },
  } = useAuth();

  return (
    <LoginStyle.Wrapper>
      <LoginStyle.Form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <Input
          label="Email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          data-testid="email_input_test_id"
        />
        <Input
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          data-testid="password_input_test_id"
        />
        <button
          type={!loading ? "submit" : "button"}
          className={loading ? "activated" : ""}
          data-testid="submit_btn_test_id"
        >
          {!loading ? "Sign In" : <Loading data-testid="loading" />}
        </button>
      </LoginStyle.Form>
    </LoginStyle.Wrapper>
  );
};
