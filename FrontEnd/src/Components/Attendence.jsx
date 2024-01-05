import { Box, Container } from "@mui/system";
// import RecordList from "./RecordList";
import PictureCam from "./PictureCam";
import { CssBaseline } from "@mui/material";

function Attendence() {
  return (
    <Container component="main">
      <CssBaseline />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PictureCam />
      </Box>
    </Container>
  );
}

export default Attendence;
