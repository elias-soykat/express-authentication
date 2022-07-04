const router = require("express").Router();

const authRoutes = require("./authRoute");

router.use("/api/v1/auth", authRoutes);

module.exports = router;
