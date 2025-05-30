import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00C853", // Green color from the mockup
    },
    secondary: {
      main: "#3366FF", // Blue gradient color
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E0E0E0",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          padding: "",
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: "16px",
          fontWeight: 300,
          fontStyle: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        backgroundColor: "#1E1E1E",
        transition: "transform 0.2s",
        height: "100%", // Add this to ensure equal height

        "&:hover": {
          transform: "translateY(-5px)",
        },
      },
    },
  },
});

export default theme;
