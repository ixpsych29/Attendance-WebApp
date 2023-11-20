import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

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
        <Box>
          <Navbar />
        </Box>
        <Box>
          <Sidebar mode={mode} setMode={setMode} />
        </Box>
        <Box flex="1" p={3} marginLeft={15}>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
