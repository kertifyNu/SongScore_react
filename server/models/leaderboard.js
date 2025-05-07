const mongoose = require("mongoose");

const leaderboardEntrySchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingSession",
      required: true,
    },
    spotifyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    accuracyScore: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const LeaderboardEntry = mongoose.model(
  "LeaderboardEntry",
  leaderboardEntrySchema
);

module.exports = LeaderboardEntry;
