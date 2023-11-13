import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RecordList = () => {
  return (
    <TableContainer sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ mb: 3, color: "text.primary" }}
      >
        Employees Attendance History
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker sx={{ left: "75%" }} label="Basic date picker" />
        </DemoContainer>
      </LocalizationProvider>

      <Table
        sx={{ minWidth: 650, mt: 3 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell align="right">Entrance Time</TableCell>
            <TableCell align="right">Entrance Pic</TableCell>
            <TableCell align="right">Leave Time</TableCell>
            <TableCell align="right">Leave Pic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Muhammad Abdullah Ibn Rafique
            </TableCell>
            <TableCell align="right">11:22 am</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">7:57 pm</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Muhammad Abdullah Ibn Rafique
            </TableCell>
            <TableCell align="right">11:22 am</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">7:57 pm</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Muhammad Abdullah Ibn Rafique
            </TableCell>
            <TableCell align="right">11:22 am</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">7:57 pm</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
