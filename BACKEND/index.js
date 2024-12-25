const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const serverless = require("serverless-http");

const bookRoutes = require("./src/books/book-routes");
const orderRoutes = require("./src/orders/order-routes");
const userRoutes = require("./src/users/user-routes");
const adminStats = require("./src/stats/admin-stats");
const HttpError = require("./src/models/http-error");

const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan("dev")); // Log HTTP requests

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local dev URL
      "https://book-store-8sijy0voy-meghana-momidis-projects.vercel.app", // Production URL
    ],
    credentials: true,
  })
);

// Route setup
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/admin", adminStats);

// Default route
app.get("/", (req, res) => {
  res.send("Book Store server is running!");
});

// Error handling
app.use((error, req, res, next) => {
  if (error instanceof HttpError) {
    return error.send(res);
  }

  console.error(error);
  res.status(500).json({
    message: "An unexpected error occurred. Please try again later.",
    error: error.message,
  });
});

// MongoDB connection function
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process on failure
  }
}

// Run the serverless function handler instead of app.listen
async function startServer() {
  await connectToDatabase();
}

// Export the app for serverless deployment
module.exports.handler = serverless(app); // Export for serverless

startServer();
