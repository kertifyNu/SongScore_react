const express = require("express");
const router = express.Router();
const randomController = require("../../controllers/songs/random");
const verifyUser = require("../../middleware/verifyUser");
const rateController = require("../../controllers/songs/rate");
router.post("/random", verifyUser, randomController);
router.post("/rate", verifyUser, rateController);
module.exports = router;
