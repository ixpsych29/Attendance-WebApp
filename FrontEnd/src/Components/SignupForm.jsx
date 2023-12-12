import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Made with 💖 by "}
      <Link color="inherit" href="http://sandyapps.co">
        SandyApps
      </Link>
      {" ©️ "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) {
      newErrors.name = "Enter Name";
      isValid = false;
    }
    if (!formData.userName) {
      newErrors.name = "Enter a unique user Name";
      isValid = false;
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (formData.password.length < 7) {
      newErrors.password = "Enter a valid password";
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const backendBaseUrl = "http://localhost:3000";
        const apiEndpoint = "/api/users";

        const response = await axios.post(`${backendBaseUrl}${apiEndpoint}`, {
          name: formData.name,
          username: formData.userName, // Ensure that the 'username' field is included
          email: formData.email,
          password: formData.password,
        });
        // Assuming your backend returns some data, you can log or use it as needed
        console.log(response.data);

        navigate("/login");

        // Optionally, you can redirect the user or perform other actions after successful registration
      } catch (error) {
        // Handle errors from the server
        console.error("Error registering user:", error);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
        // You may want to update the state or show an error message to the user
      }
    } else {
      // Form is not valid, handle accordingly
      console.log("Form is not valid");
    }
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
        <Avatar sx={{ m: 1, bgcolor: "white" }}>
          <img src="/src/assets/logo.png" width="28px" height="auto" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="text"
            autoFocus
            error={errors.name}
            value={formData.name}
            onChange={handleChanges}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="text"
            autoFocus
            error={errors.userName}
            value={formData.userName}
            onChange={handleChanges}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChanges}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChanges}
            error={errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm-Password"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
            value={formData.confirmPassword}
            onChange={handleChanges}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                {"Already have an account? login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
