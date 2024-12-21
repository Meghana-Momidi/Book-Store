const { check, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const createBookValidator = [
  check("title")
    .not() 
    .isEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 100 characters"),

  check("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  check("category")
    .not()
    .isEmpty()
    .withMessage("Category is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Category must be between 3 and 50 characters"),

  check("coverImage")
    .not()
    .isEmpty()
    .withMessage("Cover image is required")
    .isURL()
    .withMessage("Cover image must be a valid URL")
    .isLength({ min: 10, max: 255 })
    .withMessage("Cover image URL must be between 10 and 255 characters"),

  check("oldPrice")
    .isFloat({ gt: 0 })
    .withMessage("Old price must be a positive number"),

  check("newPrice")
    .isFloat({ gt: 0 })
    .withMessage("New price must be a positive number"),

  check("trending").isBoolean().withMessage("Trending must be a boolean value"),
];

const updateBookValidator = [
  check("title")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 100 characters"),

  check("description")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  check("category")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Category must be between 3 and 50 characters"),

  check("coverImage")
    .optional()
    .isURL()
    .withMessage("Cover image must be a valid URL")
    .isLength({ min: 10, max: 255 })
    .withMessage("Cover image URL must be between 10 and 255 characters"),

  check("oldPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Old price must be a positive number"),

  check("newPrice")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("New price must be a positive number"),

  check("trending")
    .optional()
    .isBoolean()
    .withMessage("Trending must be a boolean value"),
];

const validateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Invalid inputs passed,please check your data.", 400));
  }
  next();
};

module.exports = { createBookValidator, updateBookValidator, validateBook };
