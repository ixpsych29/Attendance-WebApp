import { Box, Container, CssBaseline, Stack } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // const date = new Date();
  // console.log(date);

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
      const apiUrl = `http://localhost:3000/api/attendance/all?date=${selectedDate.toISOString()}`;
      //fetching the total present employees
      const presentResponse = await axios.get(apiUrl);
      const distinctEmployeeCount = presentResponse.data.length;
      // console.log("presentResponse ", presentResponse.data);
      setPresentEmployees(distinctEmployeeCount || 0);

      // Calculate absentees as total employees minus present ones
      setAbsentEmployees(
        totalResponse.data.totalEmployees - distinctEmployeeCount || 0
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
  }, [selectedDate]);

  return (
    <Box>
      <CssBaseline />

      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          margin="0 auto"
          spacing={0}
          sx={{ mb: 7 }}
        >
          <DisplayCard title="Total" count={totalEmployees} />
          <DisplayCard title="Present" count={presentEmployees} />
          <DisplayCard title="Absent" count={absentEmployees} />
        </Stack>

        <RecordList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
