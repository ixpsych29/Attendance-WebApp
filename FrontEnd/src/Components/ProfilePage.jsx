import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import NoImage from "../assets/defaultProfile.jpg";
// import axios from "axios";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext, useState } from "react";
import UserContext from "./userContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ color: "text.primary" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        SandyApps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ProfilePage() {
  const { username } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const [profilePicture, setProfilePicture] = useState(NoImage);

  console.log(isHovered, "-----------");

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicture(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = new FormData();
    data.append("profilePicture", file);

    try {
      // Send Axios request to update the profile picture
      const response = await axios.put(
        `http://localhost:3000/api/users/${username}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile picture updated successfully");

      // Assuming the backend sends the updated profile picture URL
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      username: data.get("username"),
      gender: data.get("gender"),
      D_O_B: data.get("D.O.B"),
      phoneNo: data.get("phone-no"),
    });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ color: "text.primary" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Profile Information
        </Typography>
        <label htmlFor="upload-avatar">
          <Avatar
            sx={{
              cursor: "pointer",
              m: 5,
              bgcolor: "grey",
              width: "100px",
              height: "100px",
              "&:hover": {
                "& .upload-icon": {
                  display: "block",
                },
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            alt="profile picture"
            src={profilePicture}
          >
            {isHovered &&
              (console.log("hovered", "***********************************"),
              (
                <CameraAltIcon
                  className="upload-icon"
                  fontSize="large"
                  color="error"
                  // onClick={openFileDialog}
                />
              ))}
          </Avatar>
          <Input
            accept="image/*"
            id="upload-avatar"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue=""
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                defaultValue={username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  autoComplete="gender"
                  defaultValue="select"
                  fullWidth
                  id="gender"
                  label="Gender"
                >
                  <MenuItem value="select">Select</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="D.O.B"
                label="D.O.B"
                name="D.O.B"
                type="date"

                // placeholder=""
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone-no"
                label="Phone Number"
                name="Phone-no"
                autoComplete="phone-no"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#1db0e6",
              "&:hover": { bgcolor: "#1b1d72" },
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
