import React from "react";
import { Link } from "react-router-dom";

const SingleProductError = () => {
  return (
    <main
      className="flex flex-col items-center justify-center h-[85vh] text-center"
      role="alert"
      aria-live="assertive"
    >
      <h1 className="text-6xl mb-4" aria-hidden="true">
        🤔
      </h1>
      <h2 className="text-4xl font-bold text-red-600 mb-8">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-8">
        We couldn't load the product details. Please try again later or return
        to the homepage.
      </p>
      <Link
        to="/"
        className="bg-primary font-semibold px-4 py-2 rounded-md transition transition-transform transform hover:scale-110 duration-300"
        title="Go back to the homepage"
        aria-label="Go back to the homepage"
      >
        Go Back Home
      </Link>
    </main>
  );
};

export default SingleProductError;
