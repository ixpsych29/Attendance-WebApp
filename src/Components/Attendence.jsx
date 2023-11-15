import { Box, Stack, Container } from "@mui/system";
import Sidebar from "./Sidebar";
import RecordList from "./RecordList";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WebCam from "./WebCam";
import { useState } from "react";

function Attendence({ mode, setMode }) {
  const [shouldRender, setShouldRender] = useState(false);
  return (
    <Box>
      <Sidebar mode={mode} setMode={setMode} />
      <Container>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="small"
            startIcon={<CameraAltIcon />}
            onClick={() => setShouldRender(!shouldRender)}
          >
            Camera
          </Button>
          {/* <WebCam /> */}
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {shouldRender && <WebCam />}
        </Box>
        <RecordList />
      </Container>
    </Box>
  );
}

export default Attendence;
