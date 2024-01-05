import { Box, Container, CssBaseline, Divider, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  // const [lastFetchTimestamp, setLastFetchTimestamp] = useState(0);

  const fetchRecords = async () => {
    try {
      // Add a cache-busting parameter to the API requests
      const uniqueIdentifier = Math.random().toString(36).substring(7);

      //fetching total no of users
      const totalResponse = await axios.get(
        `http://localhost:3000/api/users?cacheBuster=${uniqueIdentifier}`
      );
      // console.log("totalResponse ", totalResponse.data);
      setTotalEmployees(totalResponse.data.totalEmployees || 0);

      //fetching the total present employees
      const presentResponse = await axios.get(
        `http://localhost:3000/api/attendance?cacheBuster=${uniqueIdentifier}`
      );
      // console.log("presentResponse ", presentResponse.data);
      setPresentEmployees(presentResponse.data.distinctEmployeeCount || 0);

      // Calculate absentees as total employees minus present ones
      setAbsentEmployees(
        totalResponse.data.totalEmployees -
          presentResponse.data.distinctEmployeeCount || 0
      );
    } catch (error) {
      console.error("Error Fetching Attendance Records", error);
    }
  };

  useEffect(() => {
    fetchRecords();

    const intervalId = setInterval(() => {
      fetchRecords();
    }, 60000); //after every 1 minute

    //clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <CssBaseline />

      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          margin="0 auto"
          spacing={0}
        >
          <DisplayCard title="Total" count={totalEmployees} />
          <DisplayCard title="Present" count={presentEmployees} />
          <DisplayCard title="Absent" count={absentEmployees} />
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
