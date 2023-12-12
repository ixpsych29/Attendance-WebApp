import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

//using default date picker by MUI
const DatePickerCmp = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{ left: "75%" }}
          label="Select Date"
          closeOnSelect={true}
          defaultValue={dayjs()}
          inputFormat
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerCmp;
