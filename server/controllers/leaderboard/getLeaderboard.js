const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const getLeaderboard = async (req, res) => {
  const ratingId = req.params.id;
  var leaderboard;
  try {
    leaderboard = await schema.LeaderboardEntry.find({
      sessionId: ratingId,
    });
    if (!leaderboard) {
      res.status(404).send({ error: "Leaderboard not found" });
      return;
    }
    res.send(leaderboard);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error getting leaderboard" });
  }
};
module.exports = getLeaderboard;
