import { Container, CssBaseline } from "@mui/material";
import RecordList from "./RecordList";

const UserDashboard = () => {
  return (
    <Container sx={{ mt: 0 }}>
      <CssBaseline />
      <RecordList />
    </Container>
  );
};

export default UserDashboard;
