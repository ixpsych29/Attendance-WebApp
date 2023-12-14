import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Badge,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignContent: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignContent: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const UserImage = styled("img")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

const Navbar = ({ login }) => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar
      position="fixed"
      sx={{
        background: `linear-gradient(90deg, 
          rgba(70, 130, 180, 1) 0%,  /* Steel Blue */
          rgba(25, 25, 112, 1) 50%,  /* Midnight Blue */
          rgba(10, 10, 10, 1) 100%);`,
        width: "100%",
      }}
    >
      <StyledToolBar>
        <img
          src="/src/assets/logo.png"
          alt="Your Logo"
          style={{ height: "40px" }}
        />
        <UserImage
          src="/src/assets/sandyApps-white.png"
          alt="Your Logo"
          style={{ height: "60px" }}
        />
        <Icons>
          <Badge badgeContent={4} color="error">
            <NotificationsIcon color="white" />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="data:image/jpeg;base64,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"
            onClick={() => setOpen(true)}
          ></Avatar>
        </Icons>
        <UserBox>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="data:image/jpeg;base64,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"
            onClick={() => setOpen(true)}
          ></Avatar>
          <Typography variant="span">ZAIN</Typography>
        </UserBox>
      </StyledToolBar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component={Link} to="/profile">
          My account
        </MenuItem>
        <MenuItem
          component={Link}
          to="/"
          onClick={() => {
            login(false);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
export default Navbar;
