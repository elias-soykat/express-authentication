const router = require("express").Router();

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");
const isAuthenticated = require("../middleware/authMiddleware");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Private Route
router.route("/user").get(isAuthenticated, getUser);

module.exports = router;
