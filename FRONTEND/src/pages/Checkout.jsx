import React, { useRef, useState } from "react";
import CartTotals from "../components/CartTotals";
import SectionTitle from "../shared/SectionTitle";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector } from "react-redux";

const Checkout = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(); // Ref to access the form
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  const handlePlaceOrderClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }
  };

  return (
    <main className="m-10 mx-16 mb-20 min-h-screen" aria-labelledby="checkout-heading">
      <header>
        <SectionTitle id="checkout-heading" text={"Place your order"} />
      </header>
      <p className="mb-4 text-md font-semibold">
        Items : <span aria-live="polite">{numItemsInCart}</span>
      </p>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
        <section aria-labelledby="checkout-form-section">
          <h2 id="checkout-form-section" className="sr-only">
            Checkout Form
          </h2>
          <CheckoutForm ref={formRef} formValidation={setIsFormValid} />
        </section>
        <aside aria-labelledby="cart-totals-section">
          <h2 id="cart-totals-section" className="sr-only">
            Cart Totals
          </h2>
          <div className="self-start">
            <CartTotals checkoutBtn={false} />
          </div>
        </aside>
      </div>
      <div className="flex justify-center lg:hidden mt-10">
        <button
          type="button"
          onClick={handlePlaceOrderClick}
          className={`shadow-lg rounded-lg bg-offerColor py-2 px-4 text-white 
          transition duration-200 ease-in-out font-semibold text-lg ${
            isFormValid ? "opacity-100 hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
          aria-disabled={!isFormValid}
          aria-label={isFormValid ? "Place your order" : "Form is invalid, button disabled"}
        >
          Place your order
        </button>
      </div>
    </main>
  );
};

export default Checkout;
