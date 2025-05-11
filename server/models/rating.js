const mongoose = require("mongoose");

const ratingSessionSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    songs: [
      {
        songId: {
          type: String,
          required: true,
        },
        rating: {
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

const RatingSession = mongoose.model("RatingSession", ratingSessionSchema);

module.exports = RatingSession;
