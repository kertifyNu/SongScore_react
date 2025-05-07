const schema = require("../../models/schemas");
const mongoose = require("mongoose");

const rate = async (req, res) => {
  const reqSong = req.body.songs;

  try {
    const user = await schema.User.findOne({ spotifyId: req.body.spotifyId });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const newRating = new schema.RatingSession({
      spotifyId: user._id,
      songs: reqSong,
    });

    await newRating.save();
    res.send({
      sessionId: newRating._id,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = rate;
