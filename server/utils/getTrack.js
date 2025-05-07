const axios = require("axios");

const getTrack = async (spotifyId, accessToken) => {
  const url = `https://api.spotify.com/v1/tracks/`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const params = { ids: spotifyId };
  const response = await axios.get(url, { headers, params });
  return response.data;
};

module.exports = getTrack;
