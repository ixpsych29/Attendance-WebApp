import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import axios from "axios";

import { useContext, useState } from "react";
import UserContext from "./userContext";
// import toast from "react-hot-toast";
import MuiPhoneNumber from "material-ui-phone-number-2";
import ProfilePictureUpload from "./ProfilePictureUpload";

export default function ProfilePage() {
  const { username } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
  });

  //handling Form Data
  const handleValueChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
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
          <ProfilePictureUpload />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  inputProps={{ maxLength: 20 }}
                  value={formData.name}
                  onChange={handleValueChange}
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

              <Grid item xs={12}>
                {/* <TextField
                  // fullWidth
                  id="phone-no"
                  label="Phone Number"
                  name="Phone-no"
                  autoComplete="phone-no"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MuiPhoneNumber defaultCountry="pk" fullWidth />
                      </InputAdornment>
                    ),
                  }}
                /> */}

                <MuiPhoneNumber
                  defaultCountry="pk"
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNo}
                  onChange={(value) =>
                    setFormData({ ...formData, phoneNo: value })
                  }
                  id="phoneNo"
                  margin="dense"
                  variant="outlined"
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
      </Container>
    </>
  );
}
