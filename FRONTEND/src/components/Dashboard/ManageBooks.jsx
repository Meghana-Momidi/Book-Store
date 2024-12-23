import React, { useState } from "react";
import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../features/books/booksApi";

const tableHeadings = ["#", "Book Title", "Category", "Price", "Actions"];
const ManageBooks = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const { data: books, refetch } = useFetchAllBooksQuery();

  const [deleteBook] = useDeleteBookMutation();

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books?.filter((book) => book.category === selectedCategory);
  console.log(books);

  const categories = ["All", ...new Set(books?.map((book) => book.category))];
  console.log(categories);
  
  // Handle deleting a book
  const handleDeleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(id).unwrap();
          Swal.fire("Deleted!", "The book has been deleted.", "success");
          refetch();
        } catch (error) {
          console.error("Failed to delete book:", error.message);
          Swal.fire(
            "Error!",
            "Failed to delete the book. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Handle navigating to Edit Book page
  const handleEditClick = (id) => {
    navigate(`dashboard/edit-book/${id}`);
  };
  return (
    <section className="py-1">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded dark:bg-gray-800 dark:text-white">
          <div className="rounded-t mb-0 px-4 py-3 border-0 ">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700 text-xl">
                  All Books
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <select
                  className="text-black p-2 rounded-lg bg-blue-500 text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                      className="bg-gray-300 text-black dark:bg-gray-800 dark:text-white"
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  {tableHeadings.map((heading) => {
                    return (
                      <th
                        key={heading}
                        className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                      >
                        {heading}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {books &&
                  filteredBooks &&
                  filteredBooks.map((book, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left text-blueGray-700">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 ">
                        {book.title}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0  whitespace-nowrap p-4">
                        {book.category}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                        ${book.newPrice}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 space-x-4 ">
                        <Link
                          to={`/dashboard/edit-book/${book._id}`}
                          className="inline-block font-medium py-1 px-4 rounded-full text-white mr-2  dark:font-bold bg-gradient-to-r from-blue-400 via-blue-500
                          to-indigo-500 
                          transform transition-all duration-200 hover:scale-110
"
                        >
                           Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="font-medium py-1 px-4 rounded-full text-white mr-2  dark:font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:bg-opacity-90 hover:scale-110 transition-all duration-200

"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;
