import { Box, Container, Divider, Stack } from "@mui/material";
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
        <Divider
          variant="middle"
          sx={{ mt: 7, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
        />
        <RecordList />
      </Container>
    </Box>
  );
};

export default Dashboard;
