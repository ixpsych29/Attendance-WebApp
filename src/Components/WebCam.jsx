import { Box, Button, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCam = () => (
  <Webcam
    audio={false}
    height={400}
    screenshotFormat="image/jpeg"
    width={600}
    videoConstraints={videoConstraints}
    mirrored={true}
  >
    {({ getScreenshot }) => (
      <>
        <IconButton
          size="large"
          aria-label="delete"
          sx={{
            border: "2px",
          }}
          onClick={() => {
            // eslint-disable-next-line no-unused-vars
            const imageSrc = getScreenshot();
          }}
        >
          <CameraAltIcon color="primary" />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
          }}
        >
          <Button variant="contained">Btn</Button>
          <Button variant="contained">Btn</Button>
        </Box>
      </>
    )}
  </Webcam>
);

export default WebCam;
