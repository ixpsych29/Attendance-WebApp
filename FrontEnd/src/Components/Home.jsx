import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

function Home({ login }) {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // Check if the current path is "/login" or "/signup"
  const isLoginPage = currentPath === "/login";
  const isSignUpPage = currentPath === "/signup";
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={Text.primary}>
        {!isLoginPage && !isSignUpPage && (
          <>
            <Box>
              <Navbar login={login} />
            </Box>
            <Box>
              <Sidebar mode={mode} setMode={setMode} />
            </Box>
          </>
        )}
        <Box flex="1" p={3} marginLeft={4}>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
