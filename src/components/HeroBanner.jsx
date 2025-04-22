import Button from "./Button";
import { Box, Typography, Container } from "@mui/material";

export default function HeroBanner() {
  return (
    <Box
      sx={{
        backgroundColor: "#00C853",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        width: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            fontWeight: 700,
            mb: 2,
          }}
        >
          Rate Your Music Journey
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
            mb: 4,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          Connect with music you love, find hidden gems, and share your musical
          preferences with friends. RateMusic helps you discover new sounds
          based on your taste.
        </Typography>

        <Button
          sx={{
            px: 4,
            py: 2,
            fontSize: { xs: "1rem", sm: "1.125rem" }, // Adjust button size for responsiveness
            borderRadius: "50px", // Optional for rounded button
          }}
        >
          Get Started Now
        </Button>
      </Container>
    </Box>
  );
}
