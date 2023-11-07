import { Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";

const Dashboard = () => {
  return (
    <Container>
      <Stack direction="row">
        <DisplayCard />
        <DisplayCard />
        <DisplayCard />
      </Stack>
    </Container>
  );
};

export default Dashboard;
