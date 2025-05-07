const schema = require("../../models/schemas");
const mongoose = require("mongoose");
const storeLeaderboard = require("../../utils/storeLeaderboard");
const guessSend = async (req, res) => {
  const id = req.params.id;
  var rating;
  try {
    rating = await schema.RatingSession.findById(id);
    if (!rating) {
      res.status(404).send({ error: "Rating not found" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ error: "Getting Rating" });
    return;
  }
  try {
    const NewGuess = new schema.GuessSession({
      sessionId: id,
      guesses: req.body.guesses,
      guesserName: req.body.guesserName,
    });

    await NewGuess.save();
    const accuracyScore = await storeLeaderboard(NewGuess, rating);
    res.send({ accuracyScore: accuracyScore });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Creating Guess" });
    return;
  }
};

module.exports = guessSend;
