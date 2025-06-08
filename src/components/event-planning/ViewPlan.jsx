import React from "react";
import {
  Grid,
  Typography,
  Box,
  InputBase,
  Button,
  ThemeProvider,
  useTheme
} from "@mui/material";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import useStyles from "../../assets/css/style";
import Header from "../../layout/Header";
import { useLocation } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

const DetailInput = ({ label, value, icon }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      border: "2px solid white",
      borderRadius: "5px",
      color: "white",
      padding: "11px 20px"
    }}
  >
    <InputBase
      value={label ? `${label}: ${value}` : value}
      readOnly
      disableUnderline
      sx={{
        flex: 1,
        color: "white",
        fontSize: "14px"
      }}
    />
    {icon && <Box sx={{ marginLeft: "8px", color: "white" }}>{icon}</Box>}
  </Box>
);

const ViewPlan = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation(); 
  const {
    eventType,
    date,
    location: eventLocation,
    noOfParticipants,
    budgetRange
  } = location.state || {}; 

  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Header />

        {/* Title Section */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginBottom: "35px", padding: { xs: "30px 10px", sm: "30px 80px" } }}
        >
          <Typography sx={{ fontSize: "30px", marginTop: 4 }}>
            MY {eventType?.toUpperCase()}
          </Typography>
        </Grid>

        {/* Event Details Section */}
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={3}>
            <DetailInput label="Event Type" value={eventType} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DetailInput value={date} icon={<CalendarToday />} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DetailInput value={eventLocation} icon={<LocationOn />} />
          </Grid>
        </Grid>

        {/* Additional Information Section */}
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}
        >
          <Grid item xs={12} md={9}>
            {[{
              label: "Number of Participants:",
              value: noOfParticipants
            }, {
              label: "Initial Budget Range:",
              value: `Rs. ${budgetRange}`
            }].map((field, index) => (
              <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
                key={index}
                sx={{ marginTop: index !== 0 ? "5px" : 0 }}
              >
                <Grid item xs={4}>
                  <Typography className={classes.typo}>{field.label}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <InputBase
                    className={classes.formInput}
                    value={field.value}
                    readOnly
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Payment Button */}
        <Grid
          container
          sx={{ padding: { xs: "20px 16px", sm: "20px 200px" }, justifyContent: "right" }}
        >
          <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handlePayment}
              variant="contained"
              sx={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "green" }}
            >
              Payment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ViewPlan;
