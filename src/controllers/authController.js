const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { asyncHandler } = require("../middleware/errorMiddleware");

const sendToken = require("../utils/sendToken");
const error = require("../utils/error");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw error("Please add all fields", 400);

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) throw error("User already exists", 400);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  if (user) sendToken(res, 201, user._id);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw error("Please add all fields", 400);

  const user = await User.findOne({ email });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (isPasswordMatched) {
    const { password, ...others } = user._doc;
    return sendToken(res, 200, others);
  } else {
    throw error("Invalid credentials", 400);
  }
});

exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
