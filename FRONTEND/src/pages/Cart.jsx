import React from "react";
import CartItemsList from "../components/CartItemsList";
import CartTotals from "../components/CartTotals";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (numItemsInCart === 0) {
    return (
      <main className="my-10 ml-6 h-screen" aria-labelledby="empty-cart-heading">
        <div className="flex justify-between border-b border-base-300 pb-5">
          <h1 id="empty-cart-heading" className="text-3xl font-medium tracking-wider capitalize ml-10">
            Your Cart is empty
          </h1>
          <Link
            to="/"
            className="mt-2 block px-6 py-3 font-medium transition duration-200 ease-in-out hover:text-gray-500 text-center"
            aria-label="Continue shopping and explore more products"
          >
            Continue Shopping <span className="text-sm" aria-hidden="true">&#10095;</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="m-10 mb-20 min-h-screen" aria-labelledby="cart-heading">
      {/* heading */}
      <header className="flex justify-between border-b border-base-300 pb-5">
        <h1 id="cart-heading" className="text-3xl font-medium tracking-wider capitalize ml-10">
          Your Cart
        </h1>
        <button
          onClick={handleClearCart}
          className="font-medium text-lg bg-primary rounded-md py-2 px-3 transition-transform transform hover:scale-110 duration-300"
          aria-label="Clear all items from the cart"
        >
          Clear Cart
        </button>
      </header>
        {/* cart items list */}
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <section
          className="lg:col-span-8"
          aria-labelledby="cart-items-heading"
        >
          <h2 id="cart-items-heading" className="sr-only">
            Cart Items List
          </h2>
          <CartItemsList />
        </section>
        {/* cart totals */}
        <aside
          className="lg:col-span-4 lg:pl-4"
          aria-labelledby="cart-totals-heading"
        >
          <h2 id="cart-totals-heading" className="sr-only">
            Cart Totals
          </h2>
          <CartTotals checkoutBtn={true} />
        </aside>
      </div>
    </main>
  );
};

export default Cart;
