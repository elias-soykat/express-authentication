const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { asyncHandler } = require("./errorMiddleware");
const error = require("../utils/error");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  const checkToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  if (checkToken) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.user).select("-password");

      next();
    } catch (err) {
      throw error("Not authorized!", 401);
    }
  }

  if (!token) throw error("Not authorized!, no token", 401);
});

module.exports = isAuthenticated;
