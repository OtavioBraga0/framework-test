import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { authSelector } from "../../domain/ducks/authReducer";
import { ROUTES } from "../Router";
import { Navbar } from "./Navbar";

export const PrivateRoute: React.FC = () => {
  const { isLogged } = useSelector(authSelector);

  if (!isLogged) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
