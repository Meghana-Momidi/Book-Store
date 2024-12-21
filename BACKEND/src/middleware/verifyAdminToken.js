const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new HttpError("Authorization token missing or invalid.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);

    // Attach the decoded token to the request object for further use
    req.user = decodedToken;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error);
    return next(new HttpError("Invalid or expired token, please log in again.", 403));
  }
};

module.exports = verifyAdminToken;
