const express = require("express");
const { createOrder, getOrdersByEmail } = require("./order-controller");
const {
  createOrderValidator,
  validateOrder,
} = require("../validators/orderValidator");

const router = express.Router();

// get orders by email address
router.get("/:email", getOrdersByEmail);

// create an order
router.post(
  "/",
  createOrderValidator,
  validateOrder,
  createOrder 
);


module.exports = router;
