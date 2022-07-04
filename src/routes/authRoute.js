const router = require("express").Router();

const authRoute = require("../controllers/authController");
const isAuthenticated = require("../middleware/authMiddleware");

router.route("/register").post(authRoute.registerUser);
router.route("/login").post(authRoute.loginUser);

// Private Route
router.route("/user").get(isAuthenticated, authRoute.getUser);

module.exports = router;
