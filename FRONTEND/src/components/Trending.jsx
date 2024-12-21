import React, { useState, useEffect } from "react";
import BooksList from "./BooksList";
import Loader from "../shared/Loader";

const Trending = ({ books, isLoading }) => {
  const filteredBooks = books
    .filter((book) => book.trending === true)
    .reverse();

  return (
    <div className="relative py-10 pb-20 w-full bg-[#FFF5EE] dark:bg-black">
      <h2 className="font-headings text-4xl mb-5 text-center">
        <i>Trending Now</i>
      </h2>
      <div className="w-20 h-px bg-black mx-auto mb-10 dark:bg-white"></div>
      {/* book list */}
      {/* Conditional rendering for loading spinner */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-10/12 mx-auto my-5">
          <BooksList books={filteredBooks} />
        </div>
      )}
    </div>
  );
};

export default Trending;
