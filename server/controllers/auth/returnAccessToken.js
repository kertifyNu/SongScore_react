const mongoose = require("mongoose");
const db = require("../../models/schemas");

const accessToken = async (req, res) => {
  const id = req.params.id;
  const user = await db.User.findOne({ spotifyId: id });
  if (!user) {
    res.status(404).send({ error: "User not found" });
    return;
  }
  console.log("user: ", user);
  res.send({ accessToken: user.accessToken });
};

module.exports = accessToken;
