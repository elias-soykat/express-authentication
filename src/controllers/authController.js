const { asyncHandler } = require("../middleware/errorMiddleware");
const sendToken = require("../utils/sendToken");
const error = require("../utils/error");

const authService = require("../service/authService");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw error("Invalid Data", 400);

  const user = await authService.registerService(name, email, password);

  if (user) sendToken(res, 201, "User created successfully", user._id);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw error("Invalid Data", 400);

  const user = await authService.loginService(email, password);

  if (user) sendToken(res, 200, "User login successfully", user);
});

exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
