import React, { useState } from "react";
import { Grid, FormControlLabel, Checkbox, Typography, InputBase } from "@mui/material";
import DropDown from "../common/DropDown";
import DatePicker from "../common/DatePicker";
import useStyles from "../../assets/css/style";

const StepOne = ({ onStepOneDataChange }) => {
  const classes = useStyles();
  const [selectedDistrict, setSelectedDistrict] = useState("Select Location District");
  const [selectedEventType, setSelectedEventType] = useState("Select Event Type");
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "eventName":
        setEventName(value);
        break;
      case "budgetRange":
        setBudgetRange(value);
        break;
      case "numberOfParticipants":
        setNumberOfParticipants(value);
        break;
      default:
        break;
    }

    onStepOneDataChange({
      eventName,
      budgetRange,
      numberOfParticipants,
      selectedDistrict,
      selectedEventType,
      selectedDate,
    });
  };

  const eventTypes = [
    "Wedding", "Birthday Party", "Conference", "Workshop", "Seminar",
    "Networking Event", "Concert", "Festival", "Product Launch",
    "Trade Show", "Fundraiser", "Corporate Meeting", "Webinar",
    "Team Building", "Award Ceremony", "Exhibition", "Bridal Shower",
    "Baby Shower", "Charity Event", "Sports Event",
  ];

  const districts = [
    "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
    "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
    "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
    "Moneragala", "Ratnapura", "Kegalle"
  ];

  return (
    <>
      {/* Location, Event Type, and Date Pickers */}
      <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
        <Grid item xs={12} sm={3}>
          <DropDown
            items={eventTypes}
            selectedItem={selectedEventType}
            setSelectedItem={setSelectedEventType}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <DropDown
            items={districts}
            selectedItem={selectedDistrict}
            setSelectedItem={setSelectedDistrict}
          />
        </Grid>
      </Grid>

      {/* Event Details Section */}
      <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
        <Grid item xs={12} md={10}>
          {[
            { label: "Enter a Name for the Event:", value: eventName, name: "eventName" },
            { label: "Enter the Number of Participants:", value: numberOfParticipants, name: "numberOfParticipants" },
            { label: "Enter Your Budget Range:", value: budgetRange, name: "budgetRange" },
          ].map((field, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={12} md={4}>
                <Typography className={classes.typo} sx={{ paddingTop: index !== 0 ? "30px" : 0 }}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <InputBase
                  className={classes.formInput}
                  type="text"
                  name={field.name}
                  value={field.value}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Checkbox for Budget Limitation */}
      <Grid container justifyContent="center" spacing={2} mt={3} sx={{ paddingLeft: { xs: "20px" } }}>
        <Grid item xs={12} sm={8}>
          <FormControlLabel
            control={<Checkbox sx={{ color: "#fff" }} />}
            label="Do you want to limit to the above budget?"
            sx={{ color: "#fff" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StepOne;

export const formatDateString = (inputDate) => {
  const date = new Date(inputDate);

  const padZero = (num) => num.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
