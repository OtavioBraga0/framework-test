/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

export const ROUTES = {
  ROOT: "/",

  // PUBLIC ROUTES
  LOGIN: "/login",

  // PRIVATE ROUTES
  HOME: "/home",
};

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        <Route path={ROUTES.ROOT} element={<PrivateRoute />}>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
