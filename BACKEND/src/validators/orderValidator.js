const { check, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const createOrderValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
  
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  
  check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number must be numeric")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be exactly 10 digits"),
  
  check("address.city")
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters"),
  
  check("address.state")
    .notEmpty()
    .withMessage("State is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2 and 50 characters"),
  
  check("address.pincode")
    .notEmpty()
    .withMessage("Pincode is required")
    .isNumeric()
    .withMessage("Pincode must be numeric")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode must be exactly 6 digits"),
  
  check("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item")
    .custom((products) =>
      products.every(
        (product) =>
          product &&
          product.productId &&
          product.amount &&
          typeof product.amount === "number"
      )
    )
    .withMessage("Each product must include a valid 'productId' and 'amount'"),
  
  check("products.*.productId")
    .isMongoId()
    .withMessage("Each product ID must be a valid MongoDB ID"),
  
  check("products.*.amount")
    .isFloat({ gt: 0 })
    .withMessage("Each product amount must be a positive number"),
  
  check("totalPrice")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a positive number"),
];

const validateOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        "Invalid inputs passed, please check your data.",
        400,
        errors.array()
      )
    );
  }
  next();
};

module.exports = { createOrderValidator, validateOrder };
