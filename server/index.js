const axios = require("axios");
const db = require("./config/dbConnect");

const authRoutes = require("./routes/index");

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3069;
dotenv.config();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
