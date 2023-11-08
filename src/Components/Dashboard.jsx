import { Box, Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import Sidebar from "./Sidebar";

const Dashboard = ({ mode, setMode }) => {
  return (
    <Box>
      <Sidebar mode={mode} setMode={setMode} />
      <Container>
        <Stack direction="row">
          <DisplayCard />
          <DisplayCard />
          <DisplayCard />
        </Stack>
      </Container>
    </Box>
  );
};

export default Dashboard;
