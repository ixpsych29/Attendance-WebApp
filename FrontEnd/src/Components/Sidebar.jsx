import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import TodayIcon from "@mui/icons-material/Today";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ mode, setMode }) => {
  const location = useLocation();
  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  return (
    <Box
      p={2}
      marginTop={6}
      sx={{
        display: {
          xs: "none",
          sm: "none",
          md: "block",
        },
      }}
    >
      <Box position={"fixed"}>
        <List
          sx={{
            color: "text.primary",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{
                background: isActiveLink("/dashboard") ? "#1db0e6" : "inherit",
                color: isActiveLink("/dashboard") ? "#fff" : "inherit",
                borderRadius: 10,
                "&:hover": {
                  background: "#1688b3",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                backgroundColor: isActiveLink("/") ? "#1db0e6" : "inherit",
                color: isActiveLink("/") ? "#fff" : "inherit",
                borderRadius: 10,
                "&:hover": {
                  background: "#1688b3",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon>
                <TodayIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Attendence" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/profile"
              sx={{
                backgroundColor: isActiveLink("/profile")
                  ? "#1db0e6"
                  : "inherit",
                color: isActiveLink("/profile") ? "#fff" : "inherit",
                borderRadius: 10,
                "&:hover": {
                  background: "#1688b3",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon>
                <PersonIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/settings"
              sx={{
                backgroundColor: isActiveLink("/settings")
                  ? "#1db0e6"
                  : "inherit",
                color: isActiveLink("/settings") ? "#fff" : "inherit",
                borderRadius: 10,
                "&:hover": {
                  background: "#1688b3",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon>
                <SettingsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                "&:hover": {
                  background: "#1688b3",
                  color: "#fff",
                  borderRadius: 10,
                },
              }}
            >
              <ListItemIcon>
                <ModeNightIcon color="primary" />
              </ListItemIcon>
              <Switch
                onChange={() => {
                  setMode(mode === "light" ? "dark" : "light");
                }}
              ></Switch>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
