import { Container, CssBaseline } from "@mui/material";
import RecordList from "./RecordList";

const UserDashboard = () => {
  return (
    <Container sx={{ mt: 0 }}>
      <CssBaseline />
      {/* <Divider
          variant="middle"
          sx={{ mt: 7, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
        /> */}
      <RecordList />
    </Container>
  );
};

export default UserDashboard;
