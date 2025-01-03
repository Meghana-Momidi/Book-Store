const mongoose = require("mongoose");
const express = require("express");
const Order = require("../orders/order-model");
const Book = require("../books/book-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    // sum of all totalPrice from orders
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Trending books statistics:
    const trendingBooksCount = await Book.aggregate([
      { $match: { trending: true } }, // Match only trending books
      { $count: "trendingBooksCount" }, // Return the count of trending books
    ]);

    // If you want just the count as a number, you can extract it like this:
    const trendingBooks =
      trendingBooksCount.length > 0
        ? trendingBooksCount[0].trendingBooksCount
        : 0;

    // Total number of books
    const totalBooks = await Book.countDocuments();

    // Monthly sales (group by month and sum total sales for each month)
    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
          totalSales: { $sum: "$totalPrice" }, // Sum totalPrice for each month
          totalOrders: { $sum: 1 }, // Count total orders for each month
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const totalBooksOrdered = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          totalBooksOrdered: { $sum: "$products.amount" },
        },
      },
    ]);
    const booksSoldByCategory = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "books",
          localField: "products.productId",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $group: {
          _id: "$bookDetails.category",
          totalBooksSold: { $sum: "$products.amount" },
        },
      },
    ]);

    const usersWithOrders = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$name",
          orders: { $sum: "$products.amount" },
        },
      },
      { $sort: { orders: -1 } }
    ]);

    res.status(200).json({
      totalOrders,
      totalSales: totalSales[0]?.totalSales || 0,
      trendingBooks,
      totalBooks,
      monthlySales,
      totalBooksOrdered: totalBooksOrdered[0]?.totalBooksOrdered,
      booksSoldByCategory,
      usersWithOrders,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});

module.exports = router;
