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
const Sidebar = ({ mode, setMode }) => {
  return (
    <Box
      p={2}
      sx={{
        display: {
          xs: "none",
          sm: "block",
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
            <ListItemButton href="#Dashboard">
              <ListItemIcon>
                <HomeIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#">
              <ListItemIcon>
                <TodayIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Attendence" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#">
              <ListItemIcon>
                <PersonIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton href="#">
              <ListItemIcon>
                <SettingsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
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
