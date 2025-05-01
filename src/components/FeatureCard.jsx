import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link,
} from "@mui/material";

export default function FeatureCard({ title, description, imageSrc, altText }) {
  return (
    <Card
      sx={{
        width: "100%", // Added width constraint
        backgroundColor: "#1E1E1E",
        height: "100%",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
        boxShadow: 3,
        borderRadius: 2,
        display: "flex", // Added flex
        flexDirection: "column", // Ensures proper card stacking
      }}
    >
      <CardMedia
        component="img"
        height="144"
        image={imageSrc}
        alt={altText}
        sx={{
          bgcolor: "#1A1A1A",
          objectFit: "cover",
          flexShrink: 0, // Prevents image from shrinking
        }}
      />
      <CardContent
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1, // Added to fill remaining space
        }}
      >
        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, color: "#E0E0E0" }}
        >
          {description}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Link
            href="#"
            color="primary"
            underline="none"
            sx={{
              fontSize: "0.75rem",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Learn more &rarr;
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
