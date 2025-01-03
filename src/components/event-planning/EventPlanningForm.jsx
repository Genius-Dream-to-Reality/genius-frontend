import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import StepOne from "./StepOne";
// import StepTwo from "./StepTwo";
// import StepThree from "./StepThree";

const STEPS = [
  { text: "Initial Setup" },
  { text: "Pick Services" },
  { text: "Finalize" },
];

const EventPlanningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ textAlign: "center", marginTop: "60px" }}>
        <Grid item xs={1} md={4}></Grid>
        {STEPS.map((step, index) => (
          <React.Fragment key={index}>
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
                    color: currentStep === index + 1 ? "#2A7CED" : "#8F8F8F",
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
        <Grid item xs={1} md={3}></Grid>
      </Grid>

      <Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
        {currentStep === 1 && <StepOne />}
        {/* {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />} */}
      </Grid>

      <Grid container spacing={5} style={{ paddingTop: "20px" }}>
        <Grid item xs={10} md={10} style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="contained"
              style={{ boxShadow: "none", marginRight: "10px" }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={currentStep === 3 ? () => alert("Done!") : handleNext}
            variant="contained"
            style={{ boxShadow: "none", height: "40px" }}
          >
            {currentStep < 3 ? "Next" : "Done"}
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const Circle = ({ number, active, completed }) => {
  const paddedNumber = number.toString().padStart(2, "0");
  return (
    <div
      style={{
        borderRadius: "50%",
        width: "65px",
        height: "65px",
        backgroundColor: completed ? "#2A7CED" : "#FFFFFF",
        border: active ? "2px solid #2A7CED" : "0.25px solid #8F8F8F",
        textAlign: "center",
        paddingTop: "10px",
      }}
    >
      <h5
        style={{
          paddingTop: "10px",
          fontSize: "16px",
          color: active ? "#2A7CED" : completed ? "#FFFFFF" : "#8F8F8F",
        }}
      >
        {paddedNumber}
      </h5>
    </div>
  );
};

export default EventPlanningForm;
