import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectionLogin({ children }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Token in localStorage all children:", token);  // Debugging token
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
