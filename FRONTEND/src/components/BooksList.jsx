import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BooksList = ({ books }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booksToDisplay, setBooksToDisplay] = useState(3);
  const displayedBooks = books.slice(
    currentIndex,
    currentIndex + booksToDisplay
  );

  const updateBooksToDisplay = () => {
    setBooksToDisplay(window.innerWidth < 768 ? 1 : 3);
  };

  useEffect(() => {
    updateBooksToDisplay();
    window.addEventListener("resize", updateBooksToDisplay);
    return () => {
      window.removeEventListener("resize", updateBooksToDisplay);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + booksToDisplay < books.length ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div
      className={`relative ${
        booksToDisplay === 1
          ? "flex justify-center items-center"
          : "grid grid-cols-1 md:grid-cols-3"
      } gap-4 w-full h-full transition-transform duration-500 ease-in`}
    >
      {displayedBooks.map((book) => (
        <div key={book._id}>
          <BookCard book={book} />
        </div>
      ))}

      {/* Previous Button */}
      <button
        className={`absolute top-1/2 -left-24  pointer-cursor mx-12 font-semibold text-xl ${
          currentIndex === 0 ? "opacity-0" : "opacity-100"
        }`}
        disabled={currentIndex === 0}
        onClick={handlePrev}
        aria-label="Previous book"
        aria-disabled={currentIndex === 0 ? "true" : "false"}
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        className={`absolute top-1/2 -right-24  lg:-right-10 pointer-cursor mx-12 font-semibold text-xl ${
          currentIndex + booksToDisplay >= books.length
            ? "opacity-0"
            : "opacity-100"
        }`}
        disabled={currentIndex + booksToDisplay >= books.length}
        onClick={handleNext}
        aria-label="Next book"
        aria-disabled={
          currentIndex + booksToDisplay >= books.length ? "true" : "false"
        }
      >
        &#10095;
      </button>
    </div>
  );
};

export default BooksList;
