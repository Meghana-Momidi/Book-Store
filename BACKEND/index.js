const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./src/books/book-routes");
const orderRoutes = require("./src/orders/order-routes");
const userRoutes = require("./src/users/user-routes");
const adminStats = require("./src/stats/admin-stats");
const HttpError = require("./src/models/http-error");

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(
  cors({
    // Handle CORS requests
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev")); // Log HTTP requests in a concise, colored format (for development)

// Route setup
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/admin", adminStats);

// Default route
app.get("/", (req, res) => {
  res.send("Book Store server is running!");
});

// Error handling middleware for undefined routes and errors
app.use((error, req, res, next) => {
  // If it's a custom HttpError, use its send method to send the error response
  if (error instanceof HttpError) {
    return error.send(res);
  }

  // Default error handler if it's not a custom HttpError
  console.error(error); // Log the error to the console
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

// Server start function
async function startServer() {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
}

// Start the server
startServer();

// Graceful shutdown on process termination
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.disconnect(); // Disconnect from MongoDB
  process.exit(0); // Exit the process
});
