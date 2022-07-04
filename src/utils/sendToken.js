const jwt = require("jsonwebtoken");

const sendToken = (res, code, user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.status(code).json({ token });
};

module.exports = sendToken;
