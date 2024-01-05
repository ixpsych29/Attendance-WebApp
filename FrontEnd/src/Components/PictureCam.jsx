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
      await axios.post("http://localhost:3000/api/attendance", {
        username: username,
        picture: imgSrc,
        entranceTime: date,
      });

      //notifying
      toast.success("Attendance Marked!");
      navigate("/home");

      // console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
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
            <CameraAltIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
