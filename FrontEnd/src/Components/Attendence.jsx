import { Box, Stack, Container } from "@mui/system";
// import RecordList from "./RecordList";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PictureCam from "./PictureCam";
import { useState } from "react";

function Attendence() {
  const [shouldRender, setShouldRender] = useState(true);

  return (
    <Box>
      <Container>
        <Stack direction="row" spacing={2}>
          <Button
            sx={{ bgcolor: "#1db0e6", "&:hover": { bgcolor: "#1688b3" } }}
            variant="contained"
            size="small"
            startIcon={<CameraAltIcon />}
            onClick={() => setShouldRender(!shouldRender)}
          >
            Camera
          </Button>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {shouldRender && <PictureCam handleRender={setShouldRender} />}
        </Box>
        {/* <RecordList /> */}
      </Container>
    </Box>
  );
}

export default Attendence;
