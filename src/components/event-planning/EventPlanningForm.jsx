import React, { useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import SideNavBar from "../../layout/SideNavBar";
import Header from "../../layout/Header";
import StepOne from "./StepOne";
// import StepTwo from "./StepTwo";
// import StepThree from "./StepThree";

const EventPlanningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <SideNavBar />
        <Grid item md={5}></Grid>
        <Grid item md={7}><Header /></Grid>
      </Grid>


        {/* Step Indicators */}
        <Grid container justifyContent="center" mb={4}>
          <Grid item xs={12} sm={8}>
            <Box display="flex" justifyContent="space-around" alignItems="center">
              {[1, 2, 3].map((step) => (
                <Box key={step} textAlign="center">
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: currentStep === step ? "#9f79cf" : "#fff",
                      color: currentStep === step ? "#fff" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step}
                  </Box>
                  <Typography mt={1}>
                    {step === 1 && "Initial Setup"}
                    {step === 2 && "Pick Services"}
                    {step === 3 && "Finalize"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Render the relevant form fields */}
        {currentStep === 1 && <StepOne />}
        {/* {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />} */}

        {/* Next Button */}
        <Grid container justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4 }}
            onClick={handleNext}
          >
            {currentStep < 3 ? "Next" : "Finish"}
          </Button>
        </Grid>
      
    </ThemeProvider>
  );
};

export default EventPlanningForm;
