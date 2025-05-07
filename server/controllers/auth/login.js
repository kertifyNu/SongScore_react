const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE_URL = "https://api.spotify.com/v1";
const scopes =
  "user-read-private user-read-email user-read-playback-state user-library-read user-top-read user-read-recently-played playlist-read-private playlist-modify-public playlist-modify-private";
const generateString = require("../../utils/randomGenerator");
const login = async function (req, res) {
  var state = generateString(16);
  // console.log(CLIENT_ID);

  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
    state: state,
    show_dialog: true,
  });
  //console.log(queryParams.toString());
  res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
};

module.exports = login;
