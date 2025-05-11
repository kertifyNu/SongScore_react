import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import User from "@/pages/User/User";
import Leaderboard from "@/pages/Leaderboard/Leaderboard";
import Guess from "@/pages/Guess/Guess";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/leaderboard/:id" element={<Leaderboard />} />
          <Route path="/guess/:id" element={<Guess />} />
          {/* Add a 404 fallback if needed */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
