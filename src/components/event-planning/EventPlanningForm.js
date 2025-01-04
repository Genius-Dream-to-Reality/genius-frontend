import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import Circle from "../common/Circle";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

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

      <Grid item xs={12} md={12} style={{ marginTop: "40px" }}>
        {currentStep === 1 && (
          <StepOne
            onStepOneDataChange={handleStepOneDataChange}
          />
        )}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
      </Grid>
      
      <Grid container style={{ padding: "20px 300px", justifyContent: "space-between" }}>
        <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-start" }}>
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="contained"
              style={{
                boxShadow: "none",
                width: "150px", 
                backgroundColor: "white", 
                color: "#7E57C2", 
              }}
            >
              Back
            </Button>
          )}
        </Grid>

        <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={currentStep === 3 ? () => alert("Done!") : handleNext}
            variant="contained"
            style={{
              boxShadow: "none",
              height: "40px",
              width: "150px", 
              backgroundColor: "#7E57C2", 
              color: "white", 
            }}
          >
            {currentStep < 3 ? "Next" : "Done"}
          </Button>
        </Grid>
      </Grid>


    </ThemeProvider>
  );
};

export default EventPlanningForm;
