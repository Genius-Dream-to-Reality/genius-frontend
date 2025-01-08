import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "#fff", 
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)", 
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiInputLabel-root": {
    color: "#fff", 
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff", 
  },
});

function DateTimePickerComponent({ selectedDate, setSelectedDate }) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Select Date and Time"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => <StyledTextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
}

export default DateTimePickerComponent;
