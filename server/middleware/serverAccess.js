const axios = require("axios");

const serverAccess = async (req, res, next) => {
  const url = "https://accounts.spotify.com/api/token";
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
      ).toString("base64"),
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const data = new URLSearchParams({
    grant_type: "client_credentials",
  }).toString();

  try {
    const response = await axios.post(url, data, { headers });
    res.locals.accessToken = response.data.access_token;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting server access token");
  }
};

module.exports = serverAccess;
