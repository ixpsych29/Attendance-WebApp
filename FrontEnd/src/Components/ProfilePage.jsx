import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Input } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import toast from "react-hot-toast";
import MuiPhoneNumber from "material-ui-phone-number-2";

export default function ProfilePage() {
  const {
    username,
    userProfilePic,
    setUserProfilePicture,
    fetchProfilePicture,
    BASE_URL,
  } = useContext(UserContext);

  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
  });

  //handling Form Data
  const handleValueChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    // Fetch the user's profile picture on component mount
    fetchProfilePicture(username);
  }, [username, fetchProfilePicture]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    //upadting the selected file state
    setSelectedFile(file);

    //displaying image immediately in avatar
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserProfilePicture(reader.result);
    };
    if (file) {
      // reader.readAsDataURL(event.target.files[0]);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //storing image in formData
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.put(
        `${BASE_URL}/api/users/${username}/update-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        fetchProfilePicture(username); // Fetch the updated profile picture from the backend
        toast.success("Profile Updated Successfully");
        setFile(null);
        setSelectedFile(null);
      }
    } catch (err) {
      console.log("Error Updating Profile Pic", err);
    }
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
          <form onSubmit={handleUpload}>
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
              >
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                ) : userProfilePic ? (
                  <img
                    src={`${BASE_URL}/uploads/Images/${userProfilePic}`} //fetching dymaically images from backend
                    alt="ProfilePicture"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <>
                    {isHovered && (
                      <CameraAltIcon
                        className="upload-icon"
                        fontSize="large"
                        // color=""
                        // onClick={openFileDialog}
                      />
                    )}
                  </>
                )}
              </Avatar>

              <Input
                accept="image/*"
                id="upload-avatar"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {file && (
                <div>
                  <Button
                    type="submit"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                    variant="outlined"
                  >
                    Upload
                  </Button>
                </div>
              )}
            </label>
          </form>
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
