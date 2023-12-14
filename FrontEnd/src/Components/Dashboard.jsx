import { Box, Container, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";

const Dashboard = () => {
  return (
    <Box>
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          margin="0 auto"
          spacing={0}
        >
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
