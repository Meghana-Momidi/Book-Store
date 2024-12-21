import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartTotals = ({ checkoutBtn }) => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(cartTotal, shipping, tax, orderTotal);

  return (
    <>
      <article className="bg-gray-100 p-4 rounded-lg shadow-lg dark:bg-dark-book-card" aria-live="polite">
        <div>
          <p className="flex justify-between text-xs border-b border-gray-400 py-2 px-2">
            <span className="text-[15px]" id="subtotal">Subtotal</span>
            <span className="font-medium text-[15px]" aria-labelledby="subtotal">
              ${cartTotal.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between border-b border-gray-400 py-2 px-2">
            <span className="text-[15px]" id="tax">Tax</span>
            <span className="font-medium text-md" aria-labelledby="tax">
              $ {tax.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between border-b border-gray-400 py-2 px-2">
            <span className="text-[15px]" id="shipping">Shipping</span>
            <span className="font-medium text-md" aria-labelledby="shipping">
              $ {shipping.toFixed(2)}
            </span>
          </p>
          <p className="flex justify-between mt-4 pb-2 px-2">
            <span className="font-medium text-xl">Total Amount</span>
            <span className="font-medium text-xl" aria-live="assertive">${orderTotal}</span>
          </p>
        </div>

        {checkoutBtn ? (
          currentUser ? (
            <Link
              to="/checkout"
              className="w-full block rounded-lg bg-blue-600 py-2 mt-4 text-white 
              transition duration-200 ease-in-out font-semibold text-lg hover:bg-blue-700 text-center"
              aria-label="Proceed to checkout"
            >
              Checkout
            </Link>
          ) : (
            <Link
              to="/login"
              className="w-full block rounded-lg bg-red-600 py-2 mt-4 text-white 
              transition duration-200 ease-in-out font-semibold text-lg hover:bg-red-700 text-center"
              aria-label="Login to proceed to checkout"
            >
              Please Login
            </Link>
          )
        ) : null}

        <Link
          to="/"
          className="mt-2 block px-6 py-3 font-medium transition duration-200 ease-in-out hover:text-gray-500 text-center"
          aria-label="Continue shopping"
        >
          Continue Shopping <span className="text-sm">&#10095;</span>
        </Link>
      </article>
    </>
  );
};

export default CartTotals;
