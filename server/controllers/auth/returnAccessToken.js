const mongoose = require("mongoose");
const db = require("../../models/schemas");

const accessToken = async (req, res) => {
 const id = cookies.get("spotifyId");
 console.log("hiiiiiiiiiiiiiiiiiii");
 console.log(req);
 //const id = "dummy"; // For testing purposes, replace with actual cookie retrieval
  if (!id) {
    console.log("Spotify ID not found in cookies");
    res.status(400).send({ error: "Spotify ID not found in cookies" });
    return;
  }
  console.log("Spotify ID: ", id);
  const user = await db.User.findOne({ spotifyId: id });
  if (!user) {
    res.status(404).send({ error: "User not found" });
    return;
  }
  console.log("user: ", user);
  res.send({ accessToken: user.accessToken, spotifyId: user.spotifyId });
};

module.exports = accessToken;
