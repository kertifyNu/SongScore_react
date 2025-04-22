import { Box, Typography, Grid, Container } from "@mui/material";
import RatingExample from "./RatingExample";
import CustomButton from "./Button";

const ratings = [
  {
    artist: "The Weeknd",
    album: "After Hours",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
  },
  {
    artist: "Kendrick Lamar",
    album: "DAMN.",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
  },
];

export default function RatingsSection() {
  return (
    <Box sx={{ bgcolor: "#1E1E1E", py: 8, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Your Music, Your Ratings
        </Typography>
        <Typography variant="body2" mb={5} sx={{ maxWidth: "600px" }}>
          RateMusic allows you to create comprehensive music libraries organized
          by your personal ratings, making it easier to rediscover favorites.
        </Typography>

        <Grid container spacing={3} mb={5}>
          {ratings.map((rating, index) => (
            <Grid item xs={12} md={6} key={index}>
              <RatingExample
                artist={rating.artist}
                album={rating.album}
                rating={rating.rating}
                imageUrl={rating.imageUrl}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <CustomButton>Start Rating Now</CustomButton>
        </Box>
      </Container>
    </Box>
  );
}
