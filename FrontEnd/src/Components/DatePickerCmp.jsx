// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import "dayjs/locale/en"; // Import the desired locale

// //using default date picker by MUI
// const DatePickerCmp = ({ value, onChange }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
//       <DemoContainer components={["DatePicker"]}>
//         <DatePicker
//           sx={{ left: "75%" }}
//           label="Select Date"
//           closeOnSelect={true}
//           defaultValue={dayjs()}
//           inputFormat
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// };

// export default DatePickerCmp;

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

const DatePickerCmp = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
      <DatePicker
        label="Select Date"
        value={value}
        onChange={onChange}
        TextFieldComponent={(props) => (
          <TextField {...props} variant="standard" />
        )}
        sx={{ left: "75%" }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerCmp;
