const express = require("express");

const router = express.Router();
const {
  createBook,
  getAllBooks,
  getSingleBookById,
  updateBookById,
  deleteBookById,
} = require("./book-controller");

const {
  createBookValidator,
  validateBook,
  updateBookValidator,
} = require("../validators/bookValidator");
const verifyAdminToken = require("../middleware/verifyAdminToken");

// get all books
router.get("/", getAllBooks);

// get single book
router.get("/:bid", getSingleBookById);

router.use(verifyAdminToken); // routes defined after itt will require authenticattion(presence of a valid token)

// post a book
router.post("/create-book", createBookValidator, validateBook, createBook);

// update a book
router.put("/edit/:bid", updateBookValidator, validateBook, updateBookById);

// delete a book
router.delete("/:bid", deleteBookById);

module.exports = router;
