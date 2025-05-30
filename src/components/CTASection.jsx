import { Box, Typography, Container } from "@mui/material";
import CustomButton from "./Button";

export default function CTASection() {
  const serverURL = import.meta.env.VITE_APP_SERVER_URI;
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(135deg, #8a2be2 0%, #4169e1 100%)", // Assuming this is what cta-gradient was
        py: 8,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Ready to Share Your Music Taste?
        </Typography>
        <Typography variant="body2" mb={4}>
          Join thousands of music lovers already rating and discovering new
          music with SongScore.
        </Typography>

        <CustomButton
          onClick={() => {
            console.log("Redirecting to login...");
            window.location.href = serverURL + "/auth/login";
          }}
          variant="outlined"
        >
          Create an Account
        </CustomButton>
      </Container>
    </Box>
  );
}
