const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
