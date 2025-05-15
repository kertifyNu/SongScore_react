import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const serverURL = import.meta.env.VITE_SERVER_URI || "http://localhost:3069";
const domain = import.meta.env.VITE_CLIENT_URI || "http://localhost:5173";

export default function HomePage() {
  const navigate = useNavigate();
  const [token, setToken] = React.useState();
  const [id, setId] = React.useState();
  const [topSongs, setTopSongs] = React.useState([]);
  const [topArtists, setTopArtists] = React.useState([
    {
      id: 1,
      name: "The Weeknd",
      image: "/api/placeholder/300/300",
      genres: ["R&B", "Pop"],
      ratings: 4.8,
    },
    {
      id: 2,
      name: "Kendrick Lamar",
      image: "/api/placeholder/300/300",
      genres: ["Hip-Hop", "Rap"],
      ratings: 4.9,
    },
    {
      id: 3,
      name: "Dua Lipa",
      image: "/api/placeholder/300/300",
      genres: ["Pop", "Dance"],
      ratings: 4.7,
    },
    {
      id: 4,
      name: "Arctic Monkeys",
      image: "/api/placeholder/300/300",
      genres: ["Indie Rock", "Alternative"],
      ratings: 4.8,
    },
  ]);
  // const leaderboardLinks = [
  //   {
  //     title: "Session with Friends",
  //     url: "https://example.com/leaderboard/abc123",
  //   },
  //   {
  //     title: "Guess Party Round 2",
  //     url: "https://example.com/leaderboard/xyz789",
  //   },
  // ];
  const [leaderboardLinks, setLeaderboardLinks] = React.useState([
    {
      title: "Session with Friends",
      url: "https://example.com/leaderboard/abc123",
    },
    {
      title: "Guess Party Round 2",
      url: "https://example.com/leaderboard/xyz789",
    },
  ]);
  const [userData, setUserData] = React.useState({
    name: "Alex Johnson",
    username: "musiclover42",
    profilePic: "/api/placeholder/150/150",
    totalRatings: 342,
    following: 87,
    followers: 124,
  });
  const fetchUserId = async () => {
    try {
      const response = await fetch(`${serverURL}/share/getUserId/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("User ID fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };
  const fetchLeaderboards = async () => {
    if (id === undefined) return;
    const userId = await fetchUserId();
    console.log("User ID: ", userId);
    try {
      const response = await fetch(`${serverURL}/songs/rate/all/${userId.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log("Leaderboard data: ", data);
      const leaderboardData = data.map((item) => ({
        title: item.name,
        url: `${domain}/leaderboard/${item._id}`,
      }));
      setLeaderboardLinks(leaderboardData);
      console.log("Leaderboard data fetched successfully:", leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  async function fetchWebApi(endpoint, method, body) {
    console.log("token: ", token);
    if (!token) {
      console.error("No token provided");
      return;
    }
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }
  async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
      await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=5", "GET")
    ).items;
  }
  async function getTopArtists() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (
      await fetchWebApi(
        "v1/me/top/artists?time_range=short_term&limit=5",
        "GET"
      )
    ).items;
  }
  async function getUserData() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
    return await fetchWebApi("v1/me", "GET");
  }
  async function setUser() {
    const user = await getUserData();
    console.log("User Data: ", user);
    setUserData({
      name: user.display_name,
      username: user.id,
      profilePic: user.images[0].url,
      totalRatings: 342,
      following: 87,
      followers: user.followers.total,
      href: user.external_urls.spotify,
    });
  }
  async function setArtists() {
    const topArtists = await getTopArtists();
    console.log("Top Artists: ", topArtists);
    console.log(
      topArtists?.map(({ name, genres }) => `${name} - ${genres.join(", ")}`)
    );
    setTopArtists(
      topArtists?.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images[0].url,
        genres: artist.genres,
        ratings: ((artist.popularity / 100) * 5).toFixed(1),
        href: artist.external_urls.spotify,
      }))
    );
  }
  async function setTopTracks() {
    const topTracks = await getTopTracks();
    console.log("Top Tracks: ", topTracks);
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
    setTopSongs(
      topTracks?.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        image: track.album.images[0].url,
        duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor(
          (track.duration_ms % 60000) / 1000
        )
          .toString()
          .padStart(2, "0")}`,
        ratings: ((track.popularity / 100) * 5).toFixed(1),
        href: track.external_urls.spotify,
      }))
    );
  }
  //get token from backend 
  const getToken = async () => {
    try {
      const response = await fetch(`${serverURL}/auth/accessToken`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log("Token fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }
  const setTokenFn = async (t) => {
      const data = await getToken();
    console.log("Token: ", data);
    if (data.access_token) {
      setToken(data.accessToken)
      setId(data.spotifyId);
      console.log("Token set: ", data.accessToken);
    } else {
      console.log("User not logged in, redirecting to login page...");
      navigate("/auth/login");
    }
  };
  useEffect(() => {
    // //get data from cookies
    // const cookies = document.cookie.split("; ");
    // const cookieObj = {};
    // cookies.forEach((cookie) => {
    //   const [name, value] = cookie.split("=");
    //   cookieObj[name] = decodeURIComponent(value);
    // });
    // console.log("cookies: ", cookieObj);
    // //check if user is logged in
    // if (!cookieObj.access_token) {
    //   console.log("User not logged in, redirecting to login page...");
    //   navigate("/auth/login");
    // } else {
    //   console.log("User is logged in, access token: ", cookieObj.access_token);
    //   const t = cookieObj.access_token;
    //   const id = cookieObj.spotifyId;
    //   setToken(t);
    //   setId(id);
    //   console.log("accToken set: ", cookieObj.access_token);
    //   if (token) console.log("Token set: ", token);
    // }
    //get token from backend
    setTokenFn();
  
  }, []);
  useEffect(() => {
    const run = async () => {
      console.log("Fetching leaderboards...");
      await fetchLeaderboards();
      console.log("Leaderboards fetched successfully.");
      console.log("Fetching top tracks...");
      await setTopTracks();
      console.log("Top tracks fetched successfully.");
      console.log("Fetching top artists...");
      await setArtists();
      console.log("Top artists fetched successfully.");
      console.log("Fetching user data...");
      await setUser();
      console.log("User data fetched successfully.");
    };
    if (token) {
      console.log("Token is set, fetching top tracks...");
      run();
    } else {
      console.log("Token is not set, skipping fetch.");
    }
    // run();
  }, [token]);
  return (
    <Box sx={{ bgcolor: "#121212", color: "white", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#00c853",
          py: 8,
          px: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight={700} mb={2}>
            Rate Your Music Journey
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Connect with music you love, find hidden gems, and share your
            musical preferences with friends. RateMusic helps you discover new
            sounds based on your taste.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/user/" + userData.username);
            }}
            sx={{
              bgcolor: "#121212",
              "&:hover": { bgcolor: "#333" },
              //fontWeight: 400,
              px: 3,
              py: 1,
              fontSize: { xs: "1rem", sm: "1.125rem" },
              // fontFamily: "Inter",
              color: "#f1f1f1",
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* User Profile Section */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 4,
            mb: 6,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Avatar
            src={userData.profilePic}
            alt={userData.name}
            onClick={() => window.open(userData.href, "_blank")}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid #00c853",
              cursor: "pointer",
            }}
          />
          <Box>
            <Typography variant="h4" component="h2" fontWeight={600} mb={1}>
              {userData.name}
            </Typography>
            <Typography variant="body1" color="#aaa" mb={2}>
              @{userData.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 3, md: 4 },
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {userData.totalRatings}
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Ratings
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {userData.following}
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Following
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight={600}>
                  {userData.followers}
                </Typography>
                <Typography variant="body2" color="#aaa">
                  Followers
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Your Leaderboard Links Section */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ color: "#00c853", fontSize: "1.2rem" }}>
            🏆
          </Box>
          Your Leaderboard Links
        </Typography>

        <Grid
          container
          spacing={2}
          mb={6}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {leaderboardLinks.map((link, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "white",
                  padding: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                  cursor: "pointer",
                }}
                onClick={() => window.open(link.url, "_blank")}
              >
                <Typography variant="body1" fontWeight={500}>
                  {link.title}
                </Typography>
                <Typography variant="body2" color="gray">
                  {link.url}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Top Artists Section */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ color: "#00c853", fontSize: "1.2rem" }}>
            🎤
          </Box>
          Your Top Artists
        </Typography>
        <Grid
          container
          spacing={3}
          mb={6}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {topArtists.map((artist) => (
            <Grid item xs={12} sm={6} md={3} key={artist.id}>
              <Card
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "white",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },

                  cursor: "pointer",
                  maxWidth: 200,
                  height: 350,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  onClick={() => window.open(artist.href, "_blank")}
                  image={artist.image}
                  alt={artist.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    fontWeight={600}
                  >
                    {artist.name}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}
                  >
                    {artist.genres.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre}
                        size="small"
                        sx={{
                          bgcolor: "#333",
                          color: "#fff",
                          fontSize: "0.7rem",
                        }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Box
                      component="span"
                      sx={{ color: "#00c853", fontSize: "1rem", mr: 0.5 }}
                    >
                      ★
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {artist.ratings}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Top Songs Section */}
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          mb={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box component="span" sx={{ color: "#00c853", fontSize: "1.2rem" }}>
            🎵
          </Box>
          Your Top Songs
        </Typography>
        <Card sx={{ bgcolor: "#1e1e1e", color: "white", mb: 6 }}>
          <CardContent>
            {topSongs.map((song, index) => (
              <Box
                key={song.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1.5,
                  borderBottom:
                    index < topSongs.length - 1 ? "1px solid #333" : "none",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    width: "30px",
                    textAlign: "center",
                    color: "#aaa",
                  }}
                >
                  {index + 1}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, mr: 2 }}
                    image={song.image}
                    alt={song.title}
                    onClick={() => window.open(song.href, "_blank")}
                  />

                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      {song.title}
                    </Typography>
                    <Typography variant="body2" color="#aaa">
                      {song.artist} • {song.album}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 3,
                    width: "180px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="span"
                      sx={{ color: "#00c853", fontSize: "1rem", mr: 0.5 }}
                    >
                      ★
                    </Box>
                    <Typography variant="body2" fontWeight={500}>
                      {song.ratings}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="#aaa"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box component="span" sx={{ fontSize: "1rem", mr: 0.5 }}>
                      ⏱
                    </Box>
                    {song.duration}
                  </Typography>
                  <Box
                    component="span"
                    onClick={() => window.open(song.href, "_blank")}
                    sx={{
                      color: "#00c853",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.1)",
                        display: "inline-block",
                      },
                    }}
                  >
                    ▶
                  </Box>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Typography variant="h5" component="h2" fontWeight={600} mb={3}>
          Your Music, Your Ratings
        </Typography>
        <Typography variant="body1" mb={4} color="#aaa">
          RateMusic allows you to create comprehensive music libraries organized
          by your personal ratings, making it easier to rediscover favorites.
        </Typography>
      </Container>

      {/* Footer */}
      <hr />
      <Footer
        bgColor="#1e1e1e"
        sx={{
          //bgcolor: "#1e1e1e",
          bgcolor: "green",
          color: "white",
          py: 4,
          px: 2,
          textAlign: "center",
        }}
      />
    </Box>
  );
}
