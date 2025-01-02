import React, { useState } from "react";
import {
  Grid,
  Input,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  InputBase,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import DropDown from "../common/DropDown";
import DatePicker from "../common/DatePicker";
import useStyles from "../../assets/css/style";

const StepOne = () => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("Select Event Type");
  const [selectedDate, setSelectedDate] = useState(null);

  const [eventName, setEventName] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [numberOfParticipants, setNumberOfParticipants] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventName") setEventName(value);
    if (name === "budgetRange") setBudgetRange(value);
    if (name === "numberOfParticipants") setNumberOfParticipants(value);
  };

  const eventTypes = [
    "Wedding", "Birthday Party", "Conference", "Workshop", "Seminar",
    "Networking Event", "Concert", "Festival", "Product Launch",
    "Trade Show", "Fundraiser", "Corporate Meeting", "Webinar",
    "Team Building", "Award Ceremony", "Exhibition", "Bridal Shower",
    "Baby Shower", "Charity Event", "Sports Event",
  ];

  return (
    <>
      <Grid container justifyContent="center" spacing={2}
        style={{ marginBottom: "10px", padding: "30px 150px 0px 150px" }}
      >
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
          <Box className={classes.BoxButton} padding="11px 20px">
            <Input
              value={location}
              placeholder="Enter the Location"
              onChange={(e) => setLocation(e.target.value)}
              disableUnderline
              sx={{
                flex: 1,
                color: "white",
                fontSize: "14px",
              }}
            />
            <LocationOn sx={{ color: "white", marginLeft: "8px" }} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}
        style={{ marginBottom: "10px", padding: "80px 400px 10px 300px" }}
      >
        <Grid item xs={12} md={4}>
          <Typography className={classes.typo}>
            Enter a Name for the Event:
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <InputBase
            className={classes.formInput}
            type="text"
            name="eventName"
            value={eventName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.typo}>
            Enter the Number of Participants:
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <InputBase
            className={classes.formInput}
            type="text"
            name="numberOfParticipants"
            value={numberOfParticipants}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography className={classes.typo}>
            Enter Your Budget Range:
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <InputBase
            className={classes.formInput}
            type="text"
            name="budgetRange"
            value={budgetRange}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2} mt={3}
        style={{ padding: "0px 80px" }}
      >
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
