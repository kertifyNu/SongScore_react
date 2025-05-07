const axios = require("axios");

const random = async function (acessToken) {
  const accessToken1 = acessToken;

  const randomSong = await axios.get("https://api.spotify.com/v1/me/tracks", {
    headers: {
      Authorization: `Bearer ${accessToken1}`,
    },
    params: {
      limit: 50,
    },
  });

  const randomNumbers = new Set();
  while (randomNumbers.size < 5) {
    const randomNumber = Math.floor(Math.random() * 50);
    randomNumbers.add(randomNumber);
  }
  const randomNumbersArray = Array.from(randomNumbers);

  const sendSongs = [];
  for (let i = 0; i < 5; i++) {
    sendSongs.push({
      trackid: randomSong.data.items[randomNumbersArray[i]].track.id,
      trackname: randomSong.data.items[randomNumbersArray[i]].track.name,
      trackArtist:
        randomSong.data.items[randomNumbersArray[i]].track.artists[0].name,
    });
  }

  return sendSongs;
};

module.exports = random;
