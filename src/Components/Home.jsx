import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

function Home() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={Text.primary}>
        <Navbar />
        <Box>
          <Sidebar mode={mode} setMode={setMode} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
