//test file to check db connection and mongoose models
const db = require("./config/dbConnect");
const User = require("./models/user");
const RatingSession = require("./models/rating");
const GuessSession = require("./models/guess");
const LeaderboardEntry = require("./models/leaderboard");
const mongoose = require("mongoose");
//check db connection
console.log(db);
//check user model
User1 = new User({
  spotifyId: "1234",
  accessToken: "dsadasdadsa",
  refreshToken: "dsadasdads",
  expiresIn: new Date(),
});
RatingSession1 = new RatingSession({
  userId: User1._id,
  Songs: [
    { songId: "1234", rating: 50 },
    { songId: "1235", rating: 50 },
  ],
});

RatingSession1.save().then((rating) => {
  console.log(rating).catch((err) => {
    console.log(err);
  });
});
