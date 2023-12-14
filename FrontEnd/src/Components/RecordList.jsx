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

const RecordList = () => {
  const { username } = useContext(UserContext);
  // console.log(username);
  const [attendanceRecord, setAttendanceRecord] = useState([]);

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
        sx={{ mb: 3, color: "text.primary" }}
      >
        {username.toUpperCase()}, Your History
      </Typography>

      <DatePickerCmp />

      <Table
        stickyHeader
        sx={{ minWidth: 650, mt: 3 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Entrance Time</TableCell>
            <TableCell align="right">Leave Time</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {attendanceRecord.map((record) => (
            <TableRow
              key={record._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* //displaying picture */}
              <TableCell align="right">
                <Avatar sx={{ width: 70, height: 70 }}>
                  {record.picture ? (
                    <img
                      src={record.picture}
                      alt="Attendance"
                      style={{ maxWidth: "100px" }}
                    />
                  ) : (
                    "Not Found"
                  )}
                </Avatar>
              </TableCell>

              {/* //displaying entranceTime */}
              <TableCell component="th" align="right" scope="row">
                {record.entranceTime}
              </TableCell>

              {/* displaying leavingTime */}
              <TableCell align="right">{record.leavingTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
