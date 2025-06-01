import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, FormControlLabel, Checkbox, Typography, InputBase, Button, TextField } from "@mui/material";
import DropDown from "../common/DropDown";
import DateTimePickerComponent from "../common/DatePicker";
import useStyles from "../../assets/css/style";
import { eventTypeApi } from "../../api/event";
import { AlertContext } from "../../contexts/AlertContext";
import dayjs from 'dayjs';
import {districts} from "../../utils/districts";

const StepOne = ({stepOneData , onStepOneDataChange}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, date: incomingDate } = location.state || {}
  const classes = useStyles();
  const { addAlert } = useContext(AlertContext);
  const [hasLocation, setHasLocation] = useState( "no");
  const minDate = dayjs().add(14, 'day'); // 2 weeks from today
  const [eventTypes, setEventTypes] = useState([])

  useEffect(() => {
    if (incomingDate) {
      onStepOneDataChange({ eventDate: incomingDate });
    }
  }, [incomingDate]);



  const handleInputChange = (field, value) => {
    onStepOneDataChange({ [field]: value });
  };

  const handleLocationDropdown = (value) => {
    setHasLocation(value.toLowerCase());

    if (value.toLowerCase() === "no") {
      handleInputChange("hasLocation",false);
      handleInputChange("eventLocation", "");
    }else{
      handleInputChange("hasLocation",true)
    }
  };

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        let result = null;
        if (category) {
          result = await eventTypeApi.getEventTypesByCategory(category.id);
        } else {
          result = await eventTypeApi.getAllEventTypes();
        }
        if (result.type === "success") {
          setEventTypes(result.data);
        } else {
          addAlert(result.message, "error");
        }
      } catch (error) {
        console.error("Error fetching event types:", error);
        addAlert("Failed to load event types", "error");
      }
    };
    fetchEventTypes();
  }, []);



  // Handle time constraints for endTime (at least 30 mins after startTime, within same day)
  const handleStartTimeChange = (value) => {
    handleInputChange("startTime", value);
    const [hour, minute] = value.split(":").map(Number);
    const startMinutes = hour * 60 + minute + 30;
    const newHour = Math.floor(startMinutes / 60);
    const newMinute = startMinutes % 60;
    const formattedEndTime = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
    if (!stepOneData.endTime || dayjs(`2000-01-01 ${stepOneData.endTime}`).isBefore(dayjs(`2000-01-01 ${formattedEndTime}`))) {
      handleInputChange("endTime", formattedEndTime);
    }
  };


  return (
      <>
        <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
          <Grid item xs={12} sm={3}>
            <DropDown
                label="Select Event Type"
                items={eventTypes.map(eventType => eventType.name)}
                selectedItem={stepOneData.selectedEventType}
                setSelectedItem={(selectedItem) => handleInputChange("selectedEventType", selectedItem)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
                type="date"
                label="Event Date"
                InputLabelProps={{ shrink: true }}
                value={stepOneData.eventDate || incomingDate}
                onChange={(e) => handleInputChange("eventDate", e.target.value)}
                inputProps={{
                  min: minDate.format('YYYY-MM-DD')
                }}
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
                type="time"
                label="Start Time"
                InputLabelProps={{ shrink: true }}
                value={stepOneData.startTime || ''}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
                type="time"
                label="End Time"
                InputLabelProps={{ shrink: true }}
                value={stepOneData.endTime || ''}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                fullWidth
                inputProps={{
                  min: stepOneData.startTime ? dayjs(`2000-01-01 ${stepOneData.startTime}`).add(30, 'minute').format('HH:mm') : undefined,
                  max: '23:59'
                }}
            />
          </Grid>


          <Grid item xs={12} sm={3}>
            <DropDown
                label="Select Location District"
                items={districts}
                selectedItem={stepOneData.selectedDistrict}
                setSelectedItem={(selectedItem)=>handleInputChange("selectedDistrict",selectedItem)}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
          <Grid item xs={12} md={9}>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography className={classes.typo}>Enter a Name for the Event:</Typography>
              </Grid>
              <Grid item xs={8}>
                <InputBase
                    className={classes.formInput}
                    type="text"
                    name="eventName"
                    value={stepOneData.eventName}
                    onChange={e => handleInputChange("eventName",e.target.value)}
                    required
                />
              </Grid>
            </Grid>
            {[
              { label: "Enter the Number of Participants:", value: stepOneData.numberOfParticipants, setter: handleInputChange, name:"numberOfParticipants"  },
              { label: "Enter Your Budget Range:", value: stepOneData.budgetRange, setter: handleInputChange, name:"budgetRange"  },
            ].map((field, index) => (
                <Grid container direction="row" spacing={2} alignItems="center" key={index} sx={{ marginTop: index !== 0 ? "5px" : 0 }}>
                  <Grid item xs={4}>
                    <Typography className={classes.typo}>{field.label}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <InputBase
                        className={classes.formInput}
                        type="number"
                        value={field.value}
                        onChange={e => field.setter(field.name,e.target.value)}
                        required
                    />
                  </Grid>
                </Grid>
            ))}
          </Grid>
        </Grid>

        {/* New Section for Event Location Selection */}
        <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
          <Grid item xs={12} md={8}>
              <DropDown
                  label="Do you have a location?"
                  items={["Yes","No"]}
                  selectedItem={hasLocation === "no" ? "No" : "Yes"}
                  setSelectedItem={(selectedItem) => handleLocationDropdown(selectedItem)}
              />

          </Grid>

          {hasLocation === "yes" && (
              <Grid item xs={12} md={8}>
                <InputBase
                    className={classes.formInput}
                    type="text"
                    placeholder="Enter the location address"
                    value={stepOneData.eventLocation || ""}
                    onChange={(e) => handleInputChange("eventLocation", e.target.value)}
                    required
                />
              </Grid>
          )}
        </Grid>

        <Grid container justifyContent="center" spacing={2} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
          <Grid item xs={12} md={8}>
            <FormControlLabel
                control={
                  <Checkbox
                      sx={{ color: "#fff" }}
                      checked={ stepOneData.budgetLimited}
                      onChange={e => handleInputChange("budgetLimited",e.target.checked)}
                  />
                }
                label="Do you want to limit to the above budget?"
                sx={{ color: "#fff" }}
            />
          </Grid>
        </Grid>



      </>
  );
};

export default StepOne;
