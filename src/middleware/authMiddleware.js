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
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user).select("-password");

      next();
    } catch (err) {
      throw error("Not authorized!", 401);
    }
  }

  if (!token) throw error("Not authorized!, no token", 401);
});

module.exports = isAuthenticated;
