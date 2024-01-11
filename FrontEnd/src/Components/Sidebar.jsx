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
              to="/home"
              sx={{
                background: isActiveLink("/home") ? "#1db0e6" : "inherit",
                color: isActiveLink("/home") ? "#fff" : "inherit",
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
              to="/home/attendence"
              sx={{
                backgroundColor: isActiveLink("/home/attendence")
                  ? "#1db0e6"
                  : "inherit",
                color: isActiveLink("/home/attendence") ? "#fff" : "inherit",
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
              to="/home/u"
              sx={{
                backgroundColor: isActiveLink("/home/u")
                  ? "#1db0e6"
                  : "inherit",
                color: isActiveLink("/home/u") ? "#fff" : "inherit",
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
              <ListItemText primary="UserDashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/home/profile"
              sx={{
                backgroundColor: isActiveLink("/home/profile")
                  ? "#1db0e6"
                  : "inherit",
                color: isActiveLink("/home/profile") ? "#fff" : "inherit",
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
            <ListItemButton>
              <ListItemIcon>
                <ModeNightIcon color="black" />
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
