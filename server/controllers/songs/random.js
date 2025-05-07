const express = require("express");
const axios = require("axios");
const router = express.Router();
const verifyUser = require("../../middleware/verifyUser");
const randomSongs = require("../../utils/getRandomSongs");
const random = require("../../utils/getRandomSongs");
const randomSong = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken = res.locals.accessToken;
  var randomSong1;
  console.log("accessToken: ", accessToken);
  try {
    randomSong1 = await random(accessToken);
  } catch (err) {
    // console.log(err);
    res.status(500).send("Error getting random song");
  }
  res.send(randomSong1);
};

module.exports = randomSong;
