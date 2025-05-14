import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import User from "@/pages/user/User";
import Leaderboard from "@/pages/leaderboard/Leaderboard";
import Guess from "@/pages/guess/Guess";
import About from "@/pages/about";

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
          <Route path="/about" element={<About />} />
          {/* Add a 404 fallback if needed */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
