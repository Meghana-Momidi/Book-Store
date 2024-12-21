import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/order-confirmation-background.jpg";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  // Prevent going back to the checkout page
  useEffect(() => {
    window.history.replaceState(null, "", "/orderConfirmation");
  }, []);

  const goHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="mt-4 min-h-screen" aria-labelledby="order-confirmation-heading">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <div className="w-[500px] mx-auto m-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true" // Hides the icon from screen readers as it is decorative
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="white"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4"
            />
          </svg>

          <h1
            id="order-confirmation-heading"
            className="text-center text-5xl text-green-500 font-semibold leading-tight tracking-wide"
            role="heading" 
            aria-level="1"
          >
            Order placed successfully! 🎉
          </h1>
          <h2 className="font-semibold text-3xl py-8 leading-tight tracking-wide">
            Thank you for shopping with us! We'll notify you when it's ready to
            ship.
          </h2>

          <a
            onClick={goHome}
            className="mt-2 block px-6 py-3 font-medium transition duration-200 ease-in-out hover:text-gray-500 text-center cursor-pointer"
            aria-label="Continue shopping"
          >
            Continue Shopping <span className="text-sm">&#10095;</span>
          </a>
        </div>
        <div
          className="bg-cover bg-center w-full h-[83vh] lg:w-[50vw]"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover", // Ensures the image covers the div
            backgroundPosition: "center",
          }}
          aria-hidden="true" // Hides the background image from screen readers
        ></div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
