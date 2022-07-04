const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { asyncHandler } = require("./errorMiddleware");

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
      res.status(401);
      throw new Error("Not authorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized!, no token");
  }
});

module.exports = isAuthenticated;
