import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckoutRoute = ({ children }) => {
  const cartItems = useSelector((state) => state.cartState.cartItems);

  // Ensure this route works even if the cart is cleared
  const isOrderBeingPlaced = window.location.pathname === "/orderConfirmation";

  if (cartItems.length >= 1 || isOrderBeingPlaced) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default CheckoutRoute;
