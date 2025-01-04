import React, { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Header from "../../layout/Header";

const STEPS = [
  { text: "Initial Setup" },
  { text: "Package Setup" },
  { text: "Finalize" },
];

const VendorAccountForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({
    serviceName: "",
    description: "",
    selectedEventType: "",
    selectedServiceType: "",
    locations: ["Gampaha", "Colombo", "Kalutara"],
    eventTypes: ["Wedding", "Birthday", "Opening Ceremony"],
    documents: {
      identification: null,
      signature: null,
    },
  });

  const [packagesData, setPackagesData] = useState({
    basic: {
      price: "",
      description: "",
      packageItems: [],
      participants: "",
      staffs: "",
      hasAC: false,
      hasBuffet: false,
      rooms: "",
      images: [],
    },
    standard: {
      price: "",
      description: "",
      packageItems: [],
      participants: "",
      staffs: "",
      hasAC: false,
      hasBuffet: false,
      rooms: "",
      images: [],
    },
    premium: {
      price: "",
      description: "",
      packageItems: [],
      participants: "",
      staffs: "",
      hasAC: false,
      hasBuffet: false,
      rooms: "",
      images: [],
    },
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepOneUpdate = (newData) => {
    setStepOneData(newData);
  };

  const handlePackagesUpdate = (newPackages) => {
    setPackagesData(newPackages);
  };
  const handleSubmit = () => {
    const finalData = {
      initialSetup: stepOneData,
      packages: packagesData,
    };
    console.log("Final Form Data:", finalData);
    // call the API
    alert("Form submitted successfully!");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne formData={stepOneData} onFormUpdate={handleStepOneUpdate} />
        );
      case 2:
        return (
          <StepTwo
            packages={packagesData}
            onPackagesUpdate={handlePackagesUpdate}
          />
        );
      case 3:
        return <StepThree initialSetup={stepOneData} packages={packagesData} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        justifyContent="center"
        style={{ textAlign: "center", marginTop: "60px" }}
      >
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
                    color: currentStep === index + 1 ? "#fff" : "#8F8F8F",
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
      </Grid>

      <Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
        {renderStepContent()}
      </Grid>

      <Grid container style={{ paddingTop: "20px" }}>
        <Grid
          item
          xs={10}
          md={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
            paddingBottom: "30px",
          }}
        >
          {currentStep > 1 && (
            <Button
              onClick={handleBack}
              variant="contained"
              style={{
                boxShadow: "none",
                marginRight: "10px",
                backgroundColor: "#B88E2F",
              }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            variant="contained"
            style={{
              boxShadow: "none",
              height: "40px",
              backgroundColor: "#B88E2F",
            }}
          >
            {currentStep < 3 ? "Next" : "Done"}
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const Circle = ({ number, active, completed }) => {
  return (
    <div
      style={{
        borderRadius: "50%",
        width: "65px",
        height: "65px",
        backgroundColor: completed ? "#B88E2F" : "transparent",
        border: active ? "2px solid #B88E2F" : "1px solid #8F8F8F",
        textAlign: "center",
        paddingTop: "10px",
      }}
    >
      <h5
        style={{
          paddingTop: "10px",
          fontSize: "16px",
          color: active ? "#fff" : completed ? "#fff" : "#8F8F8F",
        }}
      >
        {number}
      </h5>
    </div>
  );
};

export default VendorAccountForm;
