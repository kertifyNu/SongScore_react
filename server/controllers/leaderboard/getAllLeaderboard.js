const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const ObjectId = mongoose.Types.ObjectId;
const getLeaderboard = async (req, res) => {
  const id = req.params.id;
  var leaderboard;
  console.log("id", id);
  try {
    const leaderboards = await schema.LeaderboardEntry.find({
      spotifyId: new ObjectId(id),
    }).populate("sessionId");
    if (!leaderboards) {
      res.status(404).send({ error: "Leaderboard not found" });
      return;
    }
    console.log(leaderboards);
    res.send(leaderboards);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error getting leaderboard" });
  }
};
module.exports = getLeaderboard;
