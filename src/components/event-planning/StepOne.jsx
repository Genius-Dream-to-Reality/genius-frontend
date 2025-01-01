import React from "react";
import { Grid, Input, TextField } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import DropDownComponent from "../dropDowns/DropDownComponent";

const StepOne = () => (
  <Grid container justifyContent="center" spacing={2}>
    <Grid item xs={12} sm={3}>
      <DropDownComponent />
    </Grid>

    <Grid item xs={12} sm={3}>
      <TextField
        type="date"
        fullWidth
        variant="outlined"
        InputProps={{ notched: false }}
        sx={{ ml: 2 }}
      />
    </Grid>

    <Grid item xs={12} sm={3}>
      <Grid container alignItems="center" spacing={1} sx={{ padding: "10px 20px", border: "2px solid white", borderRadius: "5px", backgroundColor: "#2A204D" }}>
        <Grid item xs={11}>
          <Input
            placeholder="Enter Location"
            fullWidth
            disableUnderline
            sx={{ color: "white" }}
          />
        </Grid>
        <Grid item xs={1}>
          <LocationOn sx={{ color: "white" }} />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default StepOne;
