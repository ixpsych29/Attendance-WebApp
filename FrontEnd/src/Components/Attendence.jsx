import { Box, Container } from "@mui/system";
// import RecordList from "./RecordList";
import PictureCam from "./PictureCam";

function Attendence() {
  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PictureCam />
        </Box>
      </Container>
    </Box>
  );
}

export default Attendence;
