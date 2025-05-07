const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.login);
router.get("/callback", authController.callback);
router.get("/playlists", authController.playlists);

// router.use("/users", userRoutes);
// router.use("/sessions", sessionRoutes);
// router.use("/guesses", guessRoutes);
// router.use("/leaderboard", leaderboardRoutes);

module.exports = router;
