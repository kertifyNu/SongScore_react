import React from "react";
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
// Mock data (would normally come from Spotify API)
const userData = {
  name: "Alex Johnson",
  username: "musiclover42",
  profilePic: "/api/placeholder/150/150",
  totalRatings: 342,
  following: 87,
  followers: 124,
};

const topArtists = [
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
];

const topSongs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    image: "/api/placeholder/80/80",
    duration: "3:20",
    ratings: 4.9,
  },
  {
    id: 2,
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    album: "DAMN.",
    image: "/api/placeholder/80/80",
    duration: "2:57",
    ratings: 4.8,
  },
  {
    id: 3,
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    image: "/api/placeholder/80/80",
    duration: "3:23",
    ratings: 4.7,
  },
  {
    id: 4,
    title: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    album: "AM",
    image: "/api/placeholder/80/80",
    duration: "4:32",
    ratings: 4.9,
  },
  {
    id: 5,
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    image: "/api/placeholder/80/80",
    duration: "3:35",
    ratings: 4.7,
  },
];

export default function HomePage() {
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
            sx={{
              bgcolor: "#121212",
              "&:hover": { bgcolor: "#333" },
              fontWeight: 600,
              px: 3,
              py: 1,
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
            sx={{
              width: 120,
              height: 120,
              border: "3px solid #00c853",
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
        <Grid container spacing={3} mb={6}>
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
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
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
