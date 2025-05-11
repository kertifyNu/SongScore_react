const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const getLeaderboard = async (req, res) => {
  const ratingId = req.params.id;
  var leaderboard;
  try {
    const leaderboard = await schema.LeaderboardEntry.find({
      sessionId: ratingId,
    }).populate("sessionId");
    if (!leaderboard) {
      res.status(404).send({ error: "Leaderboard not found" });
      return;
    }
    console.log(leaderboard);
    res.send(leaderboard);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error getting leaderboard" });
  }
};
module.exports = getLeaderboard;
