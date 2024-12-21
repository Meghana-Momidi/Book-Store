const express = require("express");

const { registerUser, loginUser } = require("./user-controller");
const {
  createUserValidator,
  validateUser,
} = require("../validators/userValidator");
const router = express.Router();


router.post("/register", createUserValidator, validateUser, registerUser);
router.post("/login", loginUser);

module.exports = router;
