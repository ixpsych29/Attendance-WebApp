import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext from "./userContext";

export default function ChangePassword() {
  const { username } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  //validation of ChnagePasswordForm
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate password
    if (formData.password.length < 7 || formData.password.length > 15) {
      newErrors.password = "Enter a valid password between 7 and 15 letters";
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

  //handleChange Fucntion
  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  //handleForm Functions
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const Base_Url = "http://localhost:3000";
        const apiEndpoint = "/api/users";

        const response = await axios.put(
          `${Base_Url}${apiEndpoint}/${username}`,
          { password: formData.password }
        );

        console.log(response.data);
        toast.success("Password Changed Successfully");
      } catch (err) {
        console.error(err);
      }
    } else {
      //Password is not valid
      toast.error("Enter a Valid Password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            inputProps={{ maxLength: 15 }}
            fullWidth
            name="password"
            label="Enter New Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChanges}
            error={errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            inputProps={{ maxLength: 15 }}
            fullWidth
            name="confirmPassword"
            label="Confirm-Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="confirm-password"
            value={formData.confirmPassword}
            onChange={handleChanges}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
