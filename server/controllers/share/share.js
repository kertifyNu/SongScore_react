const mongoose = require("mongoose");
const schema = require("../../models/schemas");
const getTrack = require("../../utils/getTrack");
const share = async (req, res) => {
  const id = req.params.id;
  let name;
  var rating;
  try {
    rating = await schema.RatingSession.findById(id);
    if (!rating) {
      res.status(404).send({ error: "Rating not found" });
      return;
    }
    //object new id
    name = await schema.User.findById(rating.spotifyId);
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: "Getting Rating" });
    return;
  }

  //const accessToken = res.locals.accessToken;
  const songIds = rating.songs.map((song) => song.songId);

  const songIdsString = songIds.join(",");
  //const respose = await getTrack(songIdsString, accessToken);
  res.send({
    sessionId: id,
    name: name.name,
    songs: songIds,
  });
};

module.exports = share;
