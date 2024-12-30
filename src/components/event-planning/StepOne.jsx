import React from "react";
import { Grid, TextField, Select, MenuItem, InputLabel, Box, FormControlLabel, Checkbox } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";

const StepOne = () => (
  <Grid container justifyContent="center" spacing={2}>
    <Grid item xs={12} sm={3}>
      <InputLabel>Select Event Type</InputLabel>
      <Select fullWidth>
        <MenuItem value="wedding">Wedding</MenuItem>
        <MenuItem value="birthday">Birthday</MenuItem>
        <MenuItem value="conference">Conference</MenuItem>
      </Select>
    </Grid>
    <Grid item xs={12} sm={3}>
      <InputLabel>Select the Date</InputLabel>
      <Box display="flex" alignItems="center" sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 1, p: 1 }}>
        <CalendarToday />
        <TextField
          type="date"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ ml: 2 }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <InputLabel>Select Location</InputLabel>
      <Box display="flex" alignItems="center" sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 1, p: 1 }}>
        <LocationOn />
        <TextField
          placeholder="Enter Location"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ ml: 2 }}
        />
      </Box>
    </Grid>

    <Grid container justifyContent="center" spacing={2} mt={3}>
    <Grid item xs={12} sm={8}>
      <TextField
        label="Give the Event a Name"
        fullWidth
        variant="outlined"
        sx={{ mb: 2, input: { color: "#fff" } }}
      />
      <TextField
        label="Enter the Number of Participants"
        fullWidth
        variant="outlined"
        sx={{ mb: 2, input: { color: "#fff" } }}
      />
      <TextField
        label="Enter Your Budget Range"
        fullWidth
        variant="outlined"
        sx={{ mb: 2, input: { color: "#fff" } }}
      />
      <FormControlLabel
        control={<Checkbox sx={{ color: "#fff" }} />}
        label="Do you want to limit to the above budget"
        sx={{ color: "#fff" }}
      />
    </Grid>
    </Grid>
  </Grid>
);

export default StepOne;
