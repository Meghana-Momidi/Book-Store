import React, { useEffect, useState } from "react";
import BooksList from "./BooksList";
import Loader from "../shared/Loader";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Marketing"
];

const BestSellers = ({ books, id, isLoading }) => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section
      id={id}
      className="relative pt-10 w-full mb-20"
      aria-labelledby="bestsellers-heading"
    >
      <h2
        id="bestsellers-heading"
        className="font-headings text-4xl mx-20 mb-5 text-center"
      >
        <i>Best Sellers</i>
      </h2> 
      <div
        className="w-20 h-px bg-black mx-auto mb-10 dark:bg-white"
        aria-hidden="true"
      ></div>
      <div className="flex flex-col w-full">
        {/* Category filtering */}
        <div className="w-10/12 mx-auto mb-6 flex flex-col items-center md:flex-row md:space-x-4">
          <label htmlFor="category" className="sr-only">
            Choose a book genre
          </label>
          <select
            name="category"
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-3 py-1 focus:outline-none ml-[20px] dark:bg-gray-800"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter books by genre"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Book list */}
        
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-64">
            <Loader />
          </div>
        ) : (
          <div className="w-10/12 mx-auto my-5">
            <BooksList books={filteredBooks} />
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;
