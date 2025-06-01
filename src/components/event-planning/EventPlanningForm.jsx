import React, {useContext, useState} from "react";
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  CircularProgress,
  Box,
  ThemeProvider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../styles/theme";
import Circle from "../common/Circle";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Header from "../../layout/Header";
import {eventApi} from "../../api/event";
import {AlertContext} from "../../contexts/AlertContext";
import dayjs from "dayjs";

const STEPS = [
  { text: "Initial Setup" },
  { text: "Pick Services" },
  { text: "Finalize" },
];



const dialogStyles = {
  dialogPaper: {
    backgroundColor: "#201439",
    borderRadius: "16px",
    padding: "20px",
  },
  dialogContent: {
    backgroundColor: "#403557",
    color: "white",
    borderRadius: "16px",
    padding: "20px",
  },
  title: {
    fontSize: "30px",
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    height: "40px",
    width: "130px",
    color: "#FFFFFF",
    padding: "8px 20px",
    fontSize: "14px",
    borderRadius: "8px",
    textTransform: "none",
    display: "flex",
    alignItems: "center"
  }
};

const EventPlanningForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({
    eventName: "",
    budgetRange: "",
    numberOfParticipants: "",
    selectedDistrict: "",
    hasLocation: false,
    eventLocation:"",
    selectedEventType: "",
    eventDate: null,
    startTime:null,
    endTime:null,
    budgetLimited: false
  });
  const [addedServices,  setAddedServices] = useState([]);
  const { addAlert } = useContext(AlertContext);
  const [openPopup, setOpenPopup] = useState(false);
  const [openFinalizingPopup, setOpenFinalizingPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Do you want to finalize this plan?"
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const navigate = useNavigate();

  const DIALOG_FIELDS = [
    { label: "Number of Services:", value: addedServices.length},
    { label: "Total Budget:", value: totalPrice },
    { label: "Down Payment:", value: totalPrice * 0.1 },
  ];

  const handleNext = () => {
    if(currentStep === 2){
      console.log("inside the step 2", addedServices);
      setTotalPrice(addedServices?.reduce((sum, service) => {
        const packageType = service.selectedPackage?.toLowerCase();
        console.log(packageType);
        const selectedPackage = service[packageType];
        return sum + (selectedPackage?.price || 0);
      }, 0));
    }
    if (currentStep < 3) {
      console.log("Entered Data from Step One:", stepOneData);
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

  const handleStepTwoDataChange = (newData) => {
    setAddedServices((prevData) => ({
      ...prevData,
      ...newData,
    }));

  };

  const handleConfirm = async () => {
    setOpenPopup(false);
    setPopupMessage("Finalizing...");
    setOpenFinalizingPopup(true);
    const payload = {
      name: stepOneData.eventName,
      type: stepOneData.selectedEventType,
      eventDate: stepOneData.eventDate,
      startTime: formatTimeString(stepOneData.startTime),
      endTime: formatTimeString(stepOneData.endTime),
      district: stepOneData.selectedDistrict,
      location: stepOneData.eventLocation,
      customerId: "abc456", //add the userId here
      paymentStatus: "PENDING_PAYMENT",
      participationCount: stepOneData.numberOfParticipants,
      services: formatServices(),
      status: "PENDING_APPROVAL"
    };

    console.log(payload);

    const result = await createEvent(payload);
    if (result) {
      console.log("Event created successfully!", result);
      // You can navigate or update UI here
    }
    setTimeout(() => {
      setOpenFinalizingPopup(false);
      navigate("/eventplaning-completed",{
        state: {
          stepOneData: stepOneData,
          totalPrice:totalPrice,
          addedServices: addedServices
        }
      });
    }, 4000);
  };

  function formatTimeString(timeStr) {
    return timeStr.includes(":") ? `${timeStr}:00` : `${timeStr}:00:00`;
  }

  const handleDecline = () => {
    setOpenPopup(false);
  };

  const createEvent = async (eventData) => {
    try {
      console.log("Creating event with data:", eventData);
      const response = await eventApi.createEvent(eventData);

      if (response.type === "success") {
        addAlert("Event created successfully!", "success");
        console.log("Event creation response:", response.data);
        return response.data;
      } else {
        addAlert(`Error creating event: ${response.message}`, "error");
        console.error("Event creation failed:", response.message);
        return null;
      }
    } catch (err) {
      console.error("Error during event creation:", err);
      addAlert("Server error occurred while creating the event.", "error");
      return null;
    }
  };

  const formatServices = () => {
    let formattedServices = addedServices.map(service => ({
      id: service.id,
      packageName: service.selectedPackage,
      vendorApproved: false
    }));
    return formattedServices;
  };

const renderDialogFields = () =>
    DIALOG_FIELDS.map((field, index) => (
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        key={index}
        sx={{ marginTop: index !== 0 ? "5px" : 0 }}
      >
        <Grid item xs={5}>
          <Typography>{field.label}</Typography>
        </Grid>
        <Grid item xs={7}>
          <InputBase
            style={{ color: "white", width: "100%" }}
            value={field.value}
            readOnly
          />
        </Grid>
      </Grid>
    ));

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
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
                    sx={{
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


        {/* Rendering Steps */}
        <Grid item xs={12} md={12} style={{ marginTop: "40px" }}>
          {currentStep === 1 && (
            <StepOne
                stepOneData={stepOneData}
              onStepOneDataChange={handleStepOneDataChange}
            />
          )}
          {currentStep === 2 && <StepTwo
           stepOneData ={stepOneData}
           setAddedServices={setAddedServices}
           addedServices={addedServices}
           setCurrentPrice={setCurrentPrice}
           currentPrice={currentPrice}
          />}
          {currentStep === 3 && <StepThree
          stepOneData={stepOneData}
          addedServices={addedServices}
          totalBudget={totalPrice}

          />}
        </Grid>


        {/* Next and Back Buttons */}
        <Grid container sx={{ padding: { xs: "20px 16px", sm: "20px 200px" }, justifyContent: "space-between" }}>
          <Grid item xs={5} style={{ display: "flex", justifyContent: "flex-start" }}>
            {currentStep > 1 && (
              <Button
                onClick={handleBack}
                variant="contained"
                sx={dialogStyles.button}
                style={{
                  backgroundColor: "white",
                  color: "black",
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
              onClick={
                currentStep === 3 ? () => setOpenPopup(true) : handleNext
              }
              variant="contained"
              sx={dialogStyles.button}
              style={{ backgroundColor: "#B07207" }}
            >
              {currentStep < 3 ? "Next" : "Done"}
              <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "8px" }}>
                <path d="M18.4209 4.95911e-05L16.7976 1.43268L23.2219 7.11239H0L0 9.14449H23.2219L16.7861 14.814L18.4209 16.2568L27.6314 8.12844L18.4209 4.95911e-05Z" fill="white" />
              </svg>

            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Confirmation Popup */}
      <Dialog
        open={openPopup}
        onClose={handleDecline}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: dialogStyles.dialogPaper }}
      >
        <DialogContent sx={dialogStyles.dialogContent}>
          <Typography sx={dialogStyles.title}>{popupMessage}</Typography>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={9}>
              {renderDialogFields()}
            </Grid>
          </Grid>
          <DialogActions sx={{ justifyContent: "center", marginTop: "40px" }}>
            <Button
              onClick={handleDecline}
              sx={dialogStyles.button}
              style={{ backgroundColor: "red" }}
            >
              Decline
            </Button>
            <Button
              onClick={handleConfirm}
              sx={dialogStyles.button}
              style={{ backgroundColor: "green" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Finalizing Popup */}
      {openFinalizingPopup && (
        <Dialog
          open={openFinalizingPopup}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: dialogStyles.dialogPaper }}
        >
          <DialogContent sx={dialogStyles.dialogContent}>
            <Box sx={{ display: 'flex' , justifyContent:"center" }}>
              <CircularProgress />
            </Box>
            <Typography sx={dialogStyles.title}>{popupMessage}</Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} md={9} sx={{ textAlign: "center" }}>
                Please wait for a moment <br />
                until all the agreements are generated and vendors are notified
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}

    </ThemeProvider>
  );
};

export default EventPlanningForm;
