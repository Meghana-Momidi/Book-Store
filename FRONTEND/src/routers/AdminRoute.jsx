import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkTokenExpiration } from "../utils/tokenExpiration";

const AdminRoute = ({ children }) => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const expirationTime = localStorage.getItem("adminTokenExpiration");
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!checkTokenExpiration()) {
        setIsTokenValid(false);
      }
    }, Number(expirationTime) - Date.now()); // Set timeout based on token expiration

    return () => clearTimeout(timeoutId);
  }, []);

  if (!isTokenValid || !admin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminRoute;
