const express = require("express");
const router = express.Router();
const leaderboardController = require("../../controllers/leaderboard/getLeaderboard");

router.get("/:id", leaderboardController);
module.exports = router;
