import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import dayjs from 'dayjs';

const StyledTextField = styled(TextField)({
  backgroundColor: "#333",
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

function DateTimePickerComponent({ selectedDate, setSelectedDate, label }) {
  const normalizedValue = React.useMemo(() => {
    if (!selectedDate) return null;
    if (dayjs.isDayjs(selectedDate)) return selectedDate;
    try {
      return dayjs(selectedDate);
    } catch (e) {
      console.error("Invalid date format:", selectedDate);
      return null;
    }
  }, [selectedDate]);

  return (
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
              label={label}
              value={normalizedValue}
              onChange={(newValue) => {
                // Ensure we're passing a Day.js object or null
                setSelectedDate(newValue);
              }}
              renderInput={(params) => <StyledTextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
  );
}

export default DateTimePickerComponent;