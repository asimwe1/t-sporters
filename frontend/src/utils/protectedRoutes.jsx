import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Access user from context

  if (!user) {
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Otherwise, render the children (the protected page)
};

export default ProtectedRoute;
