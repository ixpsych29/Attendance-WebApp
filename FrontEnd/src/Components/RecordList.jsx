import {
  Avatar,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DatePickerCmp from "./DatePickerCmp";
import UserContext from "./userContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

// import dayjs from "dayjs";
// import "dayjs/locale/en"; // Import the desired locale
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import relativeTime from "dayjs/plugin/relativeTime";
// import localizedFormat from "dayjs/plugin/localizedFormat";

const RecordList = () => {
  const { username, role } = useContext(UserContext);
  // console.log(username);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const isAdmin = role === "admin";

  //formatting date & time
  const formatDateTime = (date) => {
    const time = new Date(date);
    // console.log("recordList time", time);

    //format date
    const formattedDate = time.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    //format Time
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
    return { formattedDate, formattedTime };
  };
  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        let apiUrl;
        if (isAdmin) {
          // Fetch attendance records for all users (admin)
          apiUrl = `http://localhost:3000/api/attendance/all?date=${selectedDate.toISOString()}`;
        } else {
          // Fetch attendance records for the current user
          apiUrl = `http://localhost:3000/api/attendance/${username}`;
        }

        const response = await axios.get(apiUrl);
        setAttendanceRecord(response.data);
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };

    // Calling the fetchAttendanceRecords Function
    fetchAttendanceRecords();
  }, [isAdmin, username, selectedDate]);
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 0 }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ mb: 3, color: "text.primary", mt: 3 }}
      >
        {role === "admin" ? "Admin Dashboard" : `${username}, Your History`}
      </Typography>

      <Divider
        variant="middle"
        sx={{ mt: 7, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
      />
      <DatePickerCmp value={selectedDate} onChange={handleDateChange} />

      <Table
        stickyHeader
        sx={{
          minWidth: 650,
          mt: 3,
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">Picture</TableCell>
            <TableCell align="center">User Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Entrance Time</TableCell>
            <TableCell align="center">Leave Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {attendanceRecord.map((record) => (
            <TableRow
              key={record._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* //displaying picture */}
              <TableCell
                align="center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {record.picture ? (
                  <Avatar sx={{ width: 70, height: 70 }}>
                    <img
                      src={record.picture}
                      alt="Attendance"
                      style={{ maxWidth: "100px" }}
                    />
                  </Avatar>
                ) : (
                  "Not Found"
                )}
              </TableCell>
              <TableCell align="center">{record.username}</TableCell>

              {/* //Displaying Date  */}
              <TableCell component="th" align="center" scope="row">
                {formatDateTime(record.entranceTime).formattedDate}
              </TableCell>

              {/* //displaying entranceTime */}
              <TableCell component="th" align="center" scope="row">
                {formatDateTime(record.entranceTime).formattedTime}
              </TableCell>

              {/* displaying leavingTime */}
              <TableCell component="th" align="center" scope="row">
                {formatDateTime(record.leavingTime).formattedTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
