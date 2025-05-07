const express = require("express");
const router = express.Router();
const shareController = require("../../controllers/share/share");
const guessController = require("../../controllers/share/guess");
const serverAccessToken = require("../../middleware/serverAccess");
router.get("/:id", shareController);
router.post("/:id/guess", guessController);
module.exports = router;
