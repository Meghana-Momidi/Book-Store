const User = require("./user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Sign up a new user

const registerUser = async (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return next(
      new HttpError("Please provide username, password, and role.", 400)
    );
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return next(
        new HttpError("Username is already taken, please choose another.", 400)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const { _id, username: newUserName, role: newUserRole } = newUser;
    const token = jwt.sign(
      { id: _id, username: newUserName, role: newUserRole },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

   
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        username: newUserName,
        role: newUserRole,
      },
    });
  } catch (error) {
    console.error("Failed to register user", error);
    return next(
      new HttpError("Registration failed, please try again later.", 500)
    );
  }
};

// login existing user

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new HttpError("Please provide username and password.", 400));
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return next(new HttpError("Invalid credentials, please try again.", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new HttpError("Invalid password, please try again.", 401));
    }

    const { _id, username: userName, role } = user;

    // Generate JWT token
    const token = jwt.sign(
      { id: _id, username: userName, role },
      JWT_SECRET_KEY,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        username: userName,
        role,
      },
    });
  } catch (error) {
    console.error("Failed to login", error);
    return next(new HttpError("Failed to login, please try again later.", 500));
  }
};

module.exports = { registerUser, loginUser };
