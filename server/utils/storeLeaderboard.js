const mongoose = require("mongoose");
const schema = require("../models/schemas");

const calculateAccuracy = (rating, guess) => {
  const difference = Math.abs(rating - guess);
  if (difference === 0) return 10;
  if (difference === 1) return 5;
  if (difference === 2) return 2;
  return 0;
};

const updateLeaderboard = async (guessSession, ratingSession) => {
  try {
    let totalScore = 0;
    guessSession.guesses.forEach((guess) => {
      const songRating = ratingSession.songs.find(
        (song) => song.songId === guess.songId
      );
      if (songRating) {
        totalScore += calculateAccuracy(songRating.rating, guess.guess);
      }
    });

    const leaderboardEntry = new schema.LeaderboardEntry({
      sessionId: ratingSession._id,
      spotifyId: ratingSession.spotifyId,
      name: guessSession.guesserName,
      accuracyScore: totalScore,
    });
    await leaderboardEntry.save();
    return totalScore;
  } catch (error) {
    console.error("Error updating leaderboard:", error);
  }
};

module.exports = updateLeaderboard;
