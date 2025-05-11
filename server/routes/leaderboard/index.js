const express = require("express");
const router = express.Router();
const leaderboardController = require("../../controllers/leaderboard/getLeaderboard");
const allLeaderboardController = require("../../controllers/leaderboard/getAllLeaderboard");
console.log("leaderboard routes");
router.get("/:id", leaderboardController);
router.get("/all/:id", allLeaderboardController);
module.exports = router;
