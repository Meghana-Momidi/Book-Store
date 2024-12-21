import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImgUrl } from "../utils/gettImgUrl";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../features/books/booksApi";
import { useAuth } from "../context/AuthContext";
import Tilt from 'react-parallax-tilt'

const SingleProduct = () => {
  const { id } = useParams();

  const { data: selectedBook, isFetching} = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();
  let amount;
  const handleAddToCart = (book) => {
    const cartProduct = { ...book, amount };
    dispatch(addItem({ product: cartProduct }));
  };

  // Render loading state
 
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  

  return (
    <section className="m-10 mb-20 h-full">
      <div className="w-full h-full p-4 flex justify-center items-center m-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden w-[80vw] h-full max-w-4xl justify-items-center">
          {/* Left Column - Image */}
          <Tilt perspective={400} className="md:w-3/4 h-full py-6">
            <img
              src={getImgUrl(selectedBook.coverImage)}
              alt={`Cover image of ${selectedBook.title}`}
              className="md:w-full"
              loading="lazy" 
            />
          </Tilt>

          {/* Right Column - Product Details */}
          <div className="md:w-auto grid grid-cols-1 my-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-dark-text">
              {selectedBook.title}
            </h1>
            <p className="mt-2 text-md text-gray-900 uppercase dark:text-dark-text">
              {selectedBook.category}
            </p>
            <p className="text-gray-600 mt-4 italic pb-6">
              {selectedBook.description}
            </p>
            <p className="mt-2 text-md text-gray-500 font-semibold dark:text-dark-text">
              {selectedBook.trending ? "Trending 🔥" : ""}
            </p>

            {/* Pricing */}
            <div className="mt-4">
              <p className="text-lg text-[red] font-semibold ">
                ${selectedBook.newPrice}
                {selectedBook.oldPrice && (
                  <span className="text-sm line-through ml-2 text-gray-500 dark:text-dark-text">
                    ${selectedBook.oldPrice}
                  </span>
                )}
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(selectedBook)}
              className="btn-primary px-6 flex items-center gap-1 mt-10 justify-center"
              aria-live="polite"
              aria-label={`Add ${selectedBook.title} to cart`} 
            >
              <span className="hidden lg:block">
                <FiShoppingCart />
              </span>
              <span className="pl-2"> Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Link back to products page */}
      <div className="mt-10 mb-20 flex justify-center">
        <Link
          to="/"
          className="inline-block max-w-[200px] rounded-md bg-offerColor px-6 py-3 text-center text-white font-medium transition duration-200 ease-in-out hover:bg-blue-700"
          aria-label="Go back to home page" 
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default SingleProduct;
