import { Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";

const Dashboard = () => {
  return (
    <Container>
      <Stack direction="row">
        <DisplayCard />
        <DisplayCard />
        <DisplayCard />
      </Stack>
      <RecordList />
    </Container>
  );
};

export default Dashboard;
