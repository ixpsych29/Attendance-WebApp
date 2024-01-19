import Webcam from "react-webcam";
import { useCallback, useContext, useRef, useState } from "react";
import axios from "axios";
import UserContext from "./userContext";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PictureCam = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);

  const { username } = useContext(UserContext);
  // console.log("PictureCam Working", username);

  //notification in case of success
  // const notify = () => toast.success("Success!");

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // console.log(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handlePicSubmit = async () => {
    const date = new Date();
    console.log("Attendance Submitted at: ", date);
    try {
      const existingAttendanceResponse = await axios.get(
        `http://localhost:3000/api/attendance/${username}`
      );

      //checking if attendance already marked
      if (existingAttendanceResponse.data.length > 0) {
        toast.error("Attendance Already Marked!");
        navigate("/home");
        return;
      }
      console.log("Attendance Data:", {
        username: username,
        picture: imgSrc,
        entranceTime: date,
      });

      //if not marked, then mark attendance
      await axios.post("http://localhost:3000/api/attendance", {
        username: username,
        picture: imgSrc,
        entranceTime: date.toISOString(),
      });
      console.log("before checkin condtion");
      if (checkedIn) {
        console.log("if, put api");
        const response = await axios.put(
          "http://localhost:3000/api/attendance",
          { username: username, checkoutTime: date.toISOString() }
        );
        if (response.data && response.data.error) {
          console.error("Error:", response.data.error);
          toast.error("Error updating attendance");
        } else {
          toast.success("Attendance Updated!");
          navigate("/home");
        }
        console.log("after checkin condtion");
      } else {
        console.log("else, post api");
        const response = await axios.post(
          "http://localhost:3000/api/attendance",
          {
            username: username,
            picture: imgSrc,
            entranceTime: date,
          }
        );

        // console.log("Response Data, FrontEnd", response.data);

        if (response.data && response.data.error) {
          // If the server sends an error response
          console.error("Error:", response.data.error);
          toast.error("Error marking attendance");
        } else {
          // If the attendance is marked successfully
          toast.success("Attendance Marked!");
          setCheckedIn(true);
          navigate("/home");
        }
      }
    } catch (error) {
      // console.log(error.response.data.message);
      console.log(
        "errooorrrrssssssssssssssssssssssssssssssssssssssssssssssssss"
      );
    }
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={300}
          width={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          mirrored={true}
        />
      )}
      <div style={{ textAlign: "center" }}>
        {imgSrc ? (
          <>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1db0e6",
                "&:hover": { bgcolor: "#1688b3" },
              }}
              onClick={retake}
            >
              <RefreshIcon />
            </Button>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ml: 1,
                bgcolor: "#1db0e6",
                "&:hover": { bgcolor: "#1688b3" },
              }}
              onClick={() => handlePicSubmit()}
            >
              <CheckIcon />
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mx: "auto",
              bgcolor: "#1db0e6",
              "&:hover": { bgcolor: "#1688b3" },
            }}
            onClick={capture}
          >
            Check-in &nbsp;
            <CameraAltIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
