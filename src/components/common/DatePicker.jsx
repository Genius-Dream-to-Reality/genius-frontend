import React, { useState } from "react";
import { Popover, TextField, IconButton, Box } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import useStyles from "../../assets/css/style";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className={classes.BoxButton} padding="5px 20px">
        <TextField
          value={selectedDate ? dayjs(selectedDate).format("DD/MM/YYYY") : ""}
          placeholder="Select the Date"
          InputProps={{
            readOnly: true,
            disableUnderline: true,
          }}
          variant="standard"
          sx={{
            flex: 1,
            "& input": {
              fontSize: "14px",
              color: "white",
            },
          }}
        />

        {/* Calendar Icon */}
        <IconButton onClick={handleOpen} sx={{ color: "white" }}>
          <CalendarMonth />
        </IconButton>
      </Box>

      {/* Calendar Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            backgroundColor: "#333", 
            "& .MuiPickersDay-root": {
              color: "white", 
            },
            "& .Mui-selected": {
              backgroundColor: "#1976d2", 
            },
            "& .Mui-selected:hover": {
              backgroundColor: "#1976d2", 
            },
            "& .MuiPickersDay-root:hover": {
              backgroundColor: "#444", 
            },
          }}
        />
      </Popover>
    </LocalizationProvider>
  );
};

export default DatePicker;
