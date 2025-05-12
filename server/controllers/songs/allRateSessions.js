const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const ObjectId = mongoose.Types.ObjectId;
  const getRateSessions = async (req, res) => {
    const id = req.params.id;
    var leaderboard;
    console.log("id", id);
    try {
      const rateSessions = await schema.RatingSession.find({
        spotifyId: id,
      });
      if (!rateSessions) {
        res.status(404).send({ error: "Rate sessions not found" });

        return;
      }
      console.log("rate session", rateSessions);
      res.send(rateSessions);
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Error getting rating sessions" });
    }
};
module.exports = getRateSessions;
