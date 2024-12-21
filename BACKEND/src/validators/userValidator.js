const { check, validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const createUserValidator = [
  check("username")
    .not()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .withMessage("Password must contain at least one uppercase letter and one number"),

  check("role")
    .not()
    .isEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "user"])
    .withMessage("Role must be either 'admin' or 'user'"),
];


const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 400)
    );
  }
  next();
};

module.exports = { createUserValidator, validateUser };
