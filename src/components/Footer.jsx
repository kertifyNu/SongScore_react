import { Box, Container, Typography, Link, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Footer({ bgColor = "background.default" }) {
  const navigate = useNavigate();

  // Handler functions to navigate to specific tabs in the About page
  const handleNavigateToPrivacy = () => {
    navigate("/about", { state: { activeTab: 1 } });
  };

  const handleNavigateToTerms = () => {
    navigate("/about", { state: { activeTab: 0 } });
  };

  const handleNavigateToContact = () => {
    navigate("/about", { state: { activeTab: 2 } });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: bgColor,
        py: 4,
        px: { xs: 2, md: 4 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="#E0E0E0">
          &copy; {new Date().getFullYear()} SongScore. All rights reserved.
        </Typography>
        <br />
        <Typography variant="body2" color="#E0E0E0">
          Built with ❤️ by Muhammad Hassan
        </Typography>

        <Stack direction="row" spacing={3} justifyContent="center" mt={2}>
          <Link
            onClick={handleNavigateToPrivacy}
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            onClick={handleNavigateToTerms}
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
              cursor: "pointer",
            }}
          >
            Terms of Service
          </Link>
          <Link
            onClick={handleNavigateToContact}
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
              cursor: "pointer",
            }}
          >
            Contact Us
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
