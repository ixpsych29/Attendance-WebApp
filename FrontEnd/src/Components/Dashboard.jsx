import { Box, Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";

const Dashboard = () => {
  return (
    <Box>
      <Container>
        <Stack direction="row" spacing={3}>
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
        </Stack>
        <RecordList />
      </Container>
    </Box>
  );
};

export default Dashboard;
