import { Switch, Route } from "wouter";
//import { queryClient } from "./lib/queryClient";
//import { QueryClientProvider } from "@tanstack/react-query";
//import NotFound from "@/pages/not-found";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      {/* <Route /> */}
    </Switch>
  );
}

function App() {
  return (
    //<QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
    // </QueryClientProvider>
  );
}

export default App;
