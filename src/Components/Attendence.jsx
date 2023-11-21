import { Box, Stack, Container } from "@mui/system";
import RecordList from "./RecordList";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WebCam from "./WebCam";
import { useState } from "react";

function Attendence() {
  const [shouldRender, setShouldRender] = useState(false);
  return (
    <Box>
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
