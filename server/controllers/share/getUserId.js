const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const { get } = require("http");
const getUserId = async (req, res) => {
  const id = req.params.id;
  var leaderboard;
  try {
    console.log("id in getuserid: ", id);
    const user = await schema.User.find({
      spotifyId: id,
    });
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    console.log("test ", user);
    console.log("user id: ", user[0]._id);
    res.send({id:user[0]._id});
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error getting user" });
  }
};
module.exports = getUserId;
