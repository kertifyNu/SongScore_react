const axios = require("axios");
const db = require("./config/dbConnect");
const leaderboardRoutes = require("./routes/leaderboard");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const shareRoutes = require("./routes/share");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const port = 3069;
dotenv.config();
app.use(
  cors({
    origin: "https://song-score.vercel.app", // Your frontend domain
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/songs", songRoutes);
app.use("/share", shareRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
