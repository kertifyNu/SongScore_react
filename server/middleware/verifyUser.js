const schemas = require("../models/schemas");
const dotenv = require("dotenv").config();
const axios = require("axios");
const User = schemas.User;
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const verifyUser = async function (req, res, next) {
  console.log("verifyUser");
  //check if the request has a spotifyId
  if (!req.body.spotifyId) {
    console.log("No spotifyId provided");
    return res.send("No spotifyId provided");
  }
  var user = await User.findOne({ spotifyId: req.body.spotifyId });
  if (user) {
    req.user = user;
  } else {
    res.send("User not found");
    return;
  }
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.send("No access token provided");
  }
  //check if the access token is valid
  if (!authHeader.startsWith("Bearer ")) {
    return res.send("Invalid access token");
  }
  //check if the access token is the same as the one in the database
  if (authHeader.split(" ")[1] !== user.accessToken) {
    return res.send("Invalid access token");
  }
  //check if the access token is expired
  if (user.expiresIn < Date.now()) {
    //refresh the access token
    const resp = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
      },
      body: `grant_type=refresh_token&refresh_token=${user.refreshToken}`,
      json: true,
    });
    const resp1 = await resp.json();
    user.accessToken = resp1.access_token;
    user.expiresIn = Date.now() + resp1.expires_in * 1000;
    res.locals.accessToken = user.accessToken;

    //update the user in the database
    const filter = { spotifyId: user.spotifyId };
    const update = {
      spotifyId: user.spotifyId,
      name: user.name,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      expiresIn: user.expiresIn,
    };

    const result = await User.updateOne(filter, update, { upsert: true });

    if (result.upsertedCount > 0) {
      console.log(`User inserted with id: ${result.upsertedId._id}`);
    } else {
      console.log(`User updated with id: ${user.spotifyId}`);
    }
    console.log(resp1);
    next();
  } else {
    //check if the access token is valid
    res.locals.accessToken = authHeader.split(" ")[1];

    console.log(user.expiresIn);
    next();
  }
};

module.exports = verifyUser;
