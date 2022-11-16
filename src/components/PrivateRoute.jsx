import React from "react";
import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  let loggedIn = false;

  if (loggedInUser) {
    loggedIn = true;
  }
  
  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
