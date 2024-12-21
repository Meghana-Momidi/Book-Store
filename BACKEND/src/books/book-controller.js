const mongoose = require("mongoose");
const Book = require("./book-model");
const HttpError = require("../models/http-error");
 
// create a book
const createBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res
      .status(200)
      .json({ message: "Book posted successfully", book: newBook });
  } catch (err) {
    console.error("Error creating book:", err);
    next(new HttpError("Failed to create book. Please try again.", 500));
  }
};

// get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);  // Changed to res.json
  } catch (err) {
    console.error("Error fetching all books:", err);
    next(new HttpError("Failed to fetch books. Please try again.", 500));
  }
};

// get a single book
const getSingleBookById = async (req, res, next) => {
  const bookId = req.params.bid;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return next(new HttpError("Book not found.", 404));
    }
    res.status(200).json(book);  // Changed to res.json
  } catch (err) {
    console.error(`Error fetching book with ID ${bookId}:`, err);
    next(new HttpError("Failed to fetch the book by id. Please try again.", 500));
  }
};

// update a book
const updateBookById = async (req, res, next) => {
  const bookId = req.params.bid;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return next(new HttpError("Book not found.", 404));
    }
    res
      .status(200)
      .json({ message: "Book updated successfully!", book: updatedBook });  // Changed to res.json
  } catch (err) {
    console.error(`Error updating book with ID ${bookId}:`, err);
    next(new HttpError("Failed to update the book. Please try again.", 500));
  }
};

// delete a book
const deleteBookById = async (req, res, next) => {
  const bookId = req.params.bid;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return next(new HttpError("Book not found.", 404));
    }
    res
      .status(200)
      .json({ message: "Book deleted successfully!", book: deletedBook });  // Changed to res.json
  } catch (err) {
    console.error(`Error deleting book with ID ${bookId}:`, err);
    next(new HttpError("Failed to delete the book. Please try again.", 500));
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getSingleBookById,
  updateBookById,
  deleteBookById,
};
