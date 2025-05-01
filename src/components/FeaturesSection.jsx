import FeatureCard from "./FeatureCard";
import { Box, Typography, Container, Grid } from "@mui/material";
const features = [
  {
    title: "Personalized Discovery",
    description:
      "Our advanced algorithm identifies your music preferences to suggest new artists you'll love.",
    imageSrc:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    altText: "Personalized discovery interface",
  },
  {
    title: "Rate & Review",
    description:
      "Keep track of your listening history and share detailed reviews about songs, albums, and artists.",
    imageSrc:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    altText: "Rate and review interface",
  },
  {
    title: "Share & Compare",
    description:
      "Connect with friends and compare your music taste to discover common favorites and unique gems.",
    imageSrc:
      "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    altText: "Compare with friends interface",
  },
];

export default function FeaturesSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.default",
        py: 8,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {" "}
        {/* Ensure container has proper max width */}
        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2rem" },
          }}
        >
          Why RateMusic?
        </Typography>
        <Grid container spacing={3} sx={{ maxWidth: "30%" }}>
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{
                // Ensure grid items display properly
                display: "flex",
                justifyContent: "center",
              }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                altText={feature.altText}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
