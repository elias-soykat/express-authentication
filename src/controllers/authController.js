const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const { asyncHandler } = require("../middleware/errorMiddleware");
const sendToken = require("../middleware/sendToken");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

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

  const user = await User.findOne({ email });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (isPasswordMatched) {
    const { password, ...others } = user._doc;
    return sendToken(res, 200, others);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

exports.getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
