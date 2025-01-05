import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import Circle from "../common/Circle";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Header from "../../layout/Header";

const STEPS = [
  { text: "Initial Setup" },
  { text: "Pick Services" },
  { text: "Finalize" },
];

const EventPlanningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({
    eventName: "",
    budgetRange: "",
    numberOfParticipants: "",
    selectedDistrict: "Select Location District",
    selectedEventType: "Select Event Type",
    selectedDate: null,
  });

  const handleNext = () => {
    if (currentStep < 3) {
      console.log("Entered Data from Step One:", stepOneData); // Log entered data when Next is clicked
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepOneDataChange = (newData) => {
    setStepOneData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Header />

        {/* Circular Steps */}
        <Grid container style={{ textAlign: "center", marginTop: "60px", justifyContent: "center" }}>
          {STEPS.map((step, index) => (
            <React.Fragment key={index}>
              <Grid item xs={2} md={1}>
                <hr style={{ marginTop: "32px", opacity: 0.12 }} />
              </Grid>
              <Grid item xs={2} md={1}>
                <Grid container direction="column" alignItems="center">
                  <Circle
                    number={index + 1}
                    active={currentStep === index + 1}
                    completed={currentStep > index + 1}
                  />
                  <Typography
                    style={{
                      fontSize: "12px",
                      paddingTop: "15px",
                      color: currentStep === index + 1 ? "#7E57C2" : "white",
                    }}
                  >
                    {step.text}
                  </Typography>
                </Grid>
              </Grid>

              {index !== STEPS.length - 1 && (
                <Grid item xs={2} md={1}>
                  <hr style={{ marginTop: "32px", opacity: 0.12 }} />
                </Grid>
              )}
            </React.Fragment>
          ))}
          <Grid item xs={2} md={1}>
            <hr style={{ marginTop: "32px", opacity: 0.12 }} />
          </Grid>
        </Grid>


        {/* Rendering Steps */}
        <Grid item xs={12} md={12} style={{ marginTop: "40px" }}>
          {currentStep === 1 && (
            <StepOne
              onStepOneDataChange={handleStepOneDataChange}
            />
          )}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
        </Grid>


        {/* Next and Back Buttons */}
        <Grid container sx={{ padding: {xs: "20px 16px",  sm: "20px 200px" },justifyContent: "space-between"}}>
          <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-start" }}>
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="contained"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  height: "40px",
                  width: "130px",
                  padding: "8px 20px",
                  fontSize: "14px",
                  borderRadius: "8px",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "8px" }}>
                  <path
                    d="M9.21042 -1.14441e-05L10.8338 1.43262L4.40946 7.11233H27.6313V9.14443H4.40946L10.8453 14.814L9.21042 16.2568L-4.57764e-05 8.12838L9.21042 -1.14441e-05Z"
                    fill="black"
                  />
                </svg>
                Back
              </Button>
            )}
          </Grid>

          <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={currentStep === 3 ? () => alert("Done!") : handleNext}
              variant="contained"
              style={{
                height: "40px",
                width: "130px",
                backgroundColor: "#B07207",
                color: "#FFFFFF",
                padding: "8px 20px",
                fontSize: "14px",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              {currentStep < 3 ? "Next" : "Done"}
              <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "8px" }}>
                <path d="M18.4209 4.95911e-05L16.7976 1.43268L23.2219 7.11239H0L0 9.14449H23.2219L16.7861 14.814L18.4209 16.2568L27.6314 8.12844L18.4209 4.95911e-05Z" fill="white" />
              </svg>

            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EventPlanningForm;
