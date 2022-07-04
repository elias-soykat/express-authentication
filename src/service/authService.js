const User = require("../models/userModel");

const bcrypt = require("bcryptjs");
const error = require("../utils/error");

exports.registerService = async (name, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw error("User already exists", 400);

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = User({
    name,
    email,
    password: hashed,
  });

  return user.save();
};

exports.loginService = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw error("User does not found!", 400);

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  delete user._doc.password;

  if (isPasswordMatched) {
    return user;
  } else {
    throw error("Invalid credentials", 400);
  }
};
