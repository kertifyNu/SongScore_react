import { Box, Container, Typography, Link, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.default",
        py: 4,
        px: { xs: 2, md: 4 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="#E0E0E0">
          &copy; {new Date().getFullYear()} RateMusic. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={3} justifyContent="center" mt={2}>
          <Link
            href="#"
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
            }}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            color="#E0E0E0"
            underline="none"
            sx={{
              "&:hover": {
                color: "white",
              },
              transition: "colors 0.2s",
            }}
          >
            Contact Us
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
