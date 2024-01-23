import { Box, Container } from "@mui/system";
import PictureCam from "./PictureCam";
import { CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Attendence() {
  const { username } = useContext(UserContext);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already checked in for the day
    const checkIfCheckedIn = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/attendance/${username}`
        );
        if (response.data.leavingTime != null) {
          setAttendanceMarked(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    checkIfCheckedIn();
  }, [username]);

  function redirectToDashboard() {
    toast.success("You Have Already Marked Your Attendance For Today");
    navigate("/home");
  }
  return (
    <Container component="main">
      <CssBaseline />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {attendanceMarked ? redirectToDashboard() : <PictureCam />}
      </Box>
    </Container>
  );
}

export default Attendence;
