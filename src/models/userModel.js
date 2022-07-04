const { model, Schema } = require("mongoose");

const validateEmail = function (email) {
  const check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return check.test(email);
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Name can not exceed  30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },

    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validateEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greater than 6 characters"],
    },

    roles: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
