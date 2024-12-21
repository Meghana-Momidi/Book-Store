import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);

  return (
    <section role="list" aria-labelledby="cart-items-list">
      <h2 id="cart-items-list" className="sr-only">
        List of items in your cart
      </h2>
      {cartItems.map((item) => {
        return <CartItem key={item._id} cartItem={item} />;
      })}
    </section>
  );
};

export default CartItemsList;
