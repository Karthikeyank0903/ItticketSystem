import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  // If not logged in, send to login
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // If logged in but wrong role
  if (role && userRole !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
