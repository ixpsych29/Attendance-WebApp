import { Box, Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import Sidebar from "./Sidebar";
import RecordList from "./RecordList";

const Dashboard = ({ mode, setMode }) => {
  return (
    <Box>
      <Sidebar mode={mode} setMode={setMode} />
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
