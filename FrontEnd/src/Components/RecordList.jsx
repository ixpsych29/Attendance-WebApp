import {
  Avatar,
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
// import dayjs from "dayjs";
// import "dayjs/locale/en"; // Import the desired locale
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import relativeTime from "dayjs/plugin/relativeTime";
// import localizedFormat from "dayjs/plugin/localizedFormat";

const RecordList = () => {
  const { username } = useContext(UserContext);
  // console.log(username);
  const [attendanceRecord, setAttendanceRecord] = useState([]);

  // // Enable Day.js plugins
  // dayjs.extend(utc);
  // dayjs.extend(timezone);
  // dayjs.extend(relativeTime);
  // dayjs.extend(localizedFormat);

  // // Set the default time zone to PKT
  // dayjs.tz.setDefault("Asia/Karachi");

  //formatting date & time
  const formatTime = (date) => {
    // return dayjs(date).format("hh:mm A");
    const time = new Date(date);
    let hours = time.getHours();
    console.log("Hours: ", hours);
    const minutes = time.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/attendance/${username}`
        );
        setAttendanceRecord(response.data);
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };

    //calling the fetchAttendanceRecords Function
    fetchAttendanceRecords();
  }, [username]);

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ mb: 3, color: "text.primary", mt: 3 }}
      >
        {username.toUpperCase()}, Your History
      </Typography>

      <DatePickerCmp />

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

              {/* //displaying entranceTime */}
              <TableCell component="th" align="center" scope="row">
                {/* {console.log(
                  "Formatted Time:",
                  formatTime(record.entranceTime)
                )} */}
                {formatTime(record.entranceTime)}
              </TableCell>

              {/* displaying leavingTime */}
              <TableCell align="center">{record.leavingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
