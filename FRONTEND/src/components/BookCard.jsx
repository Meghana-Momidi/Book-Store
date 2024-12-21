import React from "react";
import { getImgUrl } from "../utils/gettImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import Tilt from "react-parallax-tilt";

const BookCard = ({ book }) => {
  return (
    <Link
      key={book._id}
      to={`/books/${book._id}`}
      className="mx-auto"
      aria-label={`View details of ${book?.title}`}
    >
      <div
        className="max-w-xs flex flex-col items-center justify-center rounded overflow-hidden shadow-2xl mx-4 p-4 text-center h-full transform transition-transform duration-200 hover:scale-105 dark:bg-dark-book-card"
        role="region"
        aria-labelledby={`book-title-${book._id}`}
      >
        <Tilt perspective={250}>
          <img
            className="mx-auto pb-4 w-32 h-40"
            src={`${getImgUrl(book?.coverImage)}`}
            alt={`Cover image of ${book?.title}`}
            aria-describedby={`book-description-${book._id}`}
          />
        </Tilt>

        <div className="flex flex-col h-full justify-between">
          <div
            id={`book-title-${book._id}`}
            aria-label={`Read more about ${book?.title}`}
          >
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-4">
              {book?.title}
            </h3>
          </div>
          <p
            className="text-gray-600 dark:text-gray-400  mb-4"
            id={`book-description-${book._id}`}
            aria-describedby={`book-description-${book._id}`}
          >
            {book?.description.length > 60
              ? `${book.description.slice(0, 60)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5 text-[red]">
            ${book?.newPrice}
            <span className="line-through font-normal ml-2 text-black dark:text-dark-text">
              ${book?.oldPrice}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
