import {
  Avatar,
  Button,
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
import DownloadCSVReport from "./DownladReport";
import FormatDateTime from "./formatDateTime";

const RecordList = ({ selectedDate, setSelectedDate }) => {
  const { username, role } = useContext(UserContext);
  // console.log(username);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        let apiUrl;
        if (isAdmin) {
          // Fetch attendance records for all users (admin)
          apiUrl = `http://localhost:3000/api/attendance/all?date=${selectedDate.toISOString()}`;
        } else {
          // Fetch attendance records for the current user
          apiUrl = `http://localhost:3000/api/attendance/monthly/${username}`;
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
  const generateCSVReport = async () => {
    try {
      // Fetch attendance data for the previous month
      // const lastMonthStartDate = dayjs().subtract(1, "month").startOf("month");
      // const lastMonthEndDate = dayjs().subtract(1, "month").endOf("month");

      const currentMonthStartDate = dayjs().startOf("month");
      const currentDate = dayjs().endOf("day");

      // Generate report for the current month
      const apiUrl = `http://localhost:3000/api/attendance/report?startDate=${currentMonthStartDate.toISOString()}&endDate=${currentDate.toISOString()}`;

      // const apiUrl = `http://localhost:3000/api/attendance/report?startDate=${lastMonthStartDate.toISOString()}&endDate=${lastMonthEndDate.toISOString()}`;
      const reportResponse = await axios.get(apiUrl);
      DownloadCSVReport(reportResponse.data);
    } catch (error) {
      console.error("Error generating CSV report", error);
    }
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
      <Button
        variant="contained"
        onClick={generateCSVReport}
        sx={{ left: "5%" }}
      >
        Generate CSV Report
      </Button>
      {isAdmin ? (
        <DatePickerCmp value={selectedDate} onChange={handleDateChange} />
      ) : null}
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
                {FormatDateTime(record.entranceTime).formattedDate}
              </TableCell>

              {/* //displaying entranceTime */}
              <TableCell component="th" align="center" scope="row">
                {FormatDateTime(record.entranceTime).formattedTime}
              </TableCell>

              {/* displaying leavingTime */}

              {record.leavingTime ? (
                <TableCell component="th" align="center" scope="row">
                  {FormatDateTime(record.leavingTime).formattedTime}
                </TableCell>
              ) : (
                <TableCell component="th" align="center" scope="row">
                  {"didn't Checked Out "}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
