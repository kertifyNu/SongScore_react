const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth/authController");

router.get("/login", authController.login);
router.get("/callback", authController.callback);
router.get("/accessToken", authController.returnAccessToken);

// router.use("/users", userRoutes);
// router.use("/sessions", sessionRoutes);
// router.use("/guesses", guessRoutes);
// router.use("/leaderboard", leaderboardRoutes);

module.exports = router;
