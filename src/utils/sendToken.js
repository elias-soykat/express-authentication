const jwt = require("jsonwebtoken");

const sendToken = (res, code, message, user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(code).json({ message, token });
};

module.exports = sendToken;
