const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE_URL = "https://api.spotify.com/v1";
const scopes =
  "user-read-private user-read-email user-read-playback-state user-library-read";
const mongoose = require("mongoose");
const schemas = require("../../models/schemas");
const User = schemas.User;
const nodemailer = require("nodemailer");
const test = "dummy";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hassanrashid55@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});
const callback = async function (req, res) {
  var user = new User();

  var code = req.query.code || null;
  var state = req.query.state || null;
  var error = req.query.error || null;
  if (error) {
    queryParams = new URLSearchParams({ error: error });
    res.redirect("/#" + queryParams.toString());
  } else if (state === null) {
    queryParams = new URLSearchParams({ error: "state_mismatch" });
    res.redirect("/#" + queryParams.toString());
  } else {
    console.log("state: ", state);
    console.log("code: ", code);
    await axios({
      method: "post",
      url: TOKEN_URL,
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      },
    })
      .then(async (response) => {
        console.log("response: ", response.data);

        await axios({
          method: "get",
          url: `${API_BASE_URL}/me`,
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
          },
        })
          .then((response) => {
            console.log("id: ", response.data.id);
            user.spotifyId = response.data.id; //spotify user id stored in database
            user.name = response.data.display_name; //spotify user name stored in database
            user.email = response.data.email; //spotify user email stored in database
          })
          .catch((error) => {
            console.log("error: ", error);
            res.redirect(
              `/#${new URLSearchParams({
                error: "invalid_token nested",
              }).toString()}`
            );
          });
        user.accessToken = response.data.access_token;
        user.refreshToken = response.data.refresh_token;
        user.expiresIn = new Date(response.data.expires_in * 1000 + Date.now());
        console.log("user: ", user);
        //save user to database update if exists else create new user
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
        //send email to user
        await transporter.sendMail({
          from: '"SongScore" <hassanrashid55@gmail.com>',
          to: user.email,
          subject: "🎵 Welcome to SongScore!",
          text: `Hi ${user.name},\n\nWelcome to SongScore — we're thrilled to have you here!\n\nStart discovering, rating, and enjoying music like never before.\n\nHappy listening!\nThe SongScore Team`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px; text-align: center;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h2 style="color: #1db954;">🎵 Welcome to SongScore, ${user.name}!</h2>
        <p style="font-size: 16px; color: #333;">We're thrilled to have you on board.</p>
        <p style="font-size: 16px; color: #333;">
          With SongScore, you can:
        </p>
        <ul style="list-style-type: none; padding: 0; font-size: 16px; color: #333;">
          <li>✅ Rate your favorite songs</li>
          <li>✅ Share playlists with friends</li>
          <li>✅ Compete on the leaderboard</li>
        </ul>
        <p style="font-size: 16px; color: #333;">Click below to get started:</p>
        <a href= ${process.env.CLIENT_URI} target="_blank" style="display: inline-block; margin-top: 15px; padding: 12px 24px; background-color: #1db954; color: white; text-decoration: none; border-radius: 25px; font-size: 16px;">🎧 Start Exploring</a>
        <p style="margin-top: 30px; font-size: 14px; color: #aaa;">Happy listening!<br>The SongScore Team</p>
      </div>
    </div>
          `,
        });

        res.cookie("access_token", user.accessToken, {
          maxAge: 3600000,
          // httpOnly: true,
          // secure: false,
        });
        res.cookie("refresh_token", user.refreshToken, {
          maxAge: 3600000,
          // httpOnly: true,
          // secure: false,
        });
        res.cookie("expires_in", user.expiresIn, {
          maxAge: 3600000,
          // httpOnly: true,
          // secure: false,
        });
        res.cookie("spotifyId", user.spotifyId, {
          maxAge: 3600000,
          // httpOnly: true,
          // secure: false,
        });
        res.cookie("name", user.name, {
          maxAge: 3600000,
          // httpOnly: true,
          // secure: false,
        });

        res.redirect(`${process.env.CLIENT_URI}/home/`);

        return;
      })
      .catch((error) => {
        console.log("error: ", error);
        res.redirect(
          `/#${new URLSearchParams({ error: "invalid_token" }).toString()}`
        );
      });
  }
};

module.exports = callback;
