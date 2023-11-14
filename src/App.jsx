// import "./App.css";

import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/NavBar";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import ProfilePage from "./Components/ProfilePage";

// import LoginForm from "./Components/LoginForm";
// import SignupForm from "./Components/SignupForm";

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={Text.primary}>
        {/* <Navbar />
        <Dashboard mode={mode} setMode={setMode} /> */}
        <ProfilePage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
