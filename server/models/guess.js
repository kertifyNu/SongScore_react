const mongoose = require("mongoose");

const guessSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingSession",
      required: true,
    },

    guesserName: {
      type: String,
      required: true,
    },
    guesses: [
      {
        songId: {
          type: String,
          required: true,
        },
        guess: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true }
);

const GuessSession = mongoose.model("GuessSession", guessSessionSchema);

module.exports = GuessSession;
