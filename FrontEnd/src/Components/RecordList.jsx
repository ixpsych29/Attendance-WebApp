import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import DatePickerCmp from "./DatePickerCmp";
import UserContext from "./UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import DownloadCSVReport from "./DownladReport";
import AttendanceRecordTable from "./AttendanceRecordTable";

const RecordList = ({ selectedDate, setSelectedDate }) => {
  const { username, role ,Api_EndPoint} = useContext(UserContext);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: dayjs().startOf("month"),
    end: dayjs().endOf("day"),
  });
  const [showPreviousMonth, setShowPreviousMonth] = useState(false);

  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        let apiUrl;
        if (isAdmin) {
          // Fetch attendance records for all users (admin)
          apiUrl = `${Api_EndPoint}/api/attendance/all?date=${selectedDate.toISOString()}`;
        } else {
          // Fetch attendance records for the current user
          apiUrl = `${Api_EndPoint}/api/attendance/monthly/${username}?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`;
        }

        const response = await axios.get(apiUrl);
        setAttendanceRecord(response.data);
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };

    // Calling the fetchAttendanceRecords Function
    fetchAttendanceRecords();
  }, [isAdmin, username, selectedDate, dateRange, Api_EndPoint]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const generateCSVReport = async (reportType) => {
    try {
      let startDate, endDate;

      if (reportType === "thisMonth") {
        startDate = dayjs().startOf("month");
        endDate = dayjs().endOf("day");
      } else if (reportType === "lastMonth") {
        startDate = dayjs().subtract(1, "month").startOf("month");
        endDate = dayjs().subtract(1, "month").endOf("month");
      } else if (reportType === "last3Months") {
        startDate = dayjs().subtract(3, "month").startOf("month");
        endDate = dayjs().subtract(1, "month").endOf("month");
      }

      const apiUrl = `${Api_EndPoint}/api/attendance/report?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      const reportResponse = await axios.get(apiUrl);
      DownloadCSVReport(reportResponse.data, reportType);
    } catch (error) {
      console.error("Error generating CSV report", error);
    }
  };
  const handleLastMonthClick = () => {
    // Set the date range to last month
    setDateRange({
      start: dayjs().subtract(1, "month").startOf("month"),
      end: dayjs().subtract(1, "month").endOf("month"),
    });
    setShowPreviousMonth(true);
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
      {isAdmin ? (
        <Box>
          <Button
            variant="contained"
            onClick={handleMenuOpen}
            sx={{ left: "5%", mr: 1 }}
          >
            Generate Report
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => generateCSVReport("thisMonth")}>
              This Month Report
            </MenuItem>
            <MenuItem onClick={() => generateCSVReport("lastMonth")}>
              Last Month Report
            </MenuItem>
            <MenuItem onClick={() => generateCSVReport("last3Months")}>
              Last 3 Months Report
            </MenuItem>
          </Menu>
          <DatePickerCmp value={selectedDate} onChange={handleDateChange} />{" "}
        </Box>
      ) : showPreviousMonth ? (
        <Button
          variant="contained"
          onClick={() => {
            setShowPreviousMonth(false);
            setDateRange({
              start: dayjs().startOf("month"),
              end: dayjs().endOf("day"),
            });
          }}
          sx={{ left: "5%", mr: 1 }}
        >
          This Month Records
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleLastMonthClick}
          sx={{ left: "5%", mr: 1 }}
        >
          Previous Month Records
        </Button>
      )}
      <AttendanceRecordTable attendanceRecord={attendanceRecord} />
    </TableContainer>
  );
};

export default RecordList;
