const mongoose = require("mongoose");
const Order = require("./order-model");
const HttpError = require("../models/http-error");

// create an order
const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order", error);
    next(new HttpError("Failed to create the order. Please try again.", 500));
  }
};
// get orders by email
const getOrdersByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log("Fetching orders for email:", email); // Log to check incoming request

    // Find orders by email and populate the `productId` within `products`
    const orders = await Order.find({ email })
      .populate("products.productId")
      .sort({ createdAt: -1 });

    console.log("Fetched orders:", orders); // Log the populated orders

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found!" });
    }

    // Optionally format the response if you need specific data structure
    const formattedOrders = orders.map((order) => ({
      id: order._id,
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      products: order.products.map((product) => ({
        productDetails: product.productId, // Populated product details
        amount: product.amount, // Quantity or amount
      })),
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders", error);
    next(new HttpError("Failed to fetch orders. Please try again.", 500));
  }
};

module.exports = { createOrder, getOrdersByEmail };
