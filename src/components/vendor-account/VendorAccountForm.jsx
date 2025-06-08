import React, { useState, useContext, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Header from "../../layout/Header";
import { vendorApi } from "../../api/vendor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/AlertContext";

const STEPS = [
  { text: "Initial Setup" },
  { text: "Package Setup" },
  { text: "Finalize" },
];

const MAX_IMAGE_SIZE = 800; // Maximum width/height in pixels
const JPEG_QUALITY = 0.6; // JPEG quality (0.6 = 60% quality)

const VendorAccountForm = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { addAlert } = useContext(AlertContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [stepOneData, setStepOneData] = useState({
    serviceName: "",
    description: "",
    selectedServiceType: "",
    selectedServiceTypeName: "",
    locations: ["Gampaha", "Colombo", "Kalutara"],
    eventTypes: ["Wedding", "Birthday Party", "Corporate Events"],
    documents: {
      identification: null,
      signature: null,
    },
  });

  const [packagesData, setPackagesData] = useState({
    basic: {
      price: "",
      description: "",
      participants: "",
      staffs: "",
      images: [],
      other: {}  // For custom fields
    },
    standard: {
      price: "",
      description: "",
      participants: "",
      staffs: "",
      images: [],
      other: {}  // For custom fields
    },
    premium: {
      price: "",
      description: "",
      participants: "",
      staffs: "",
      images: [],
      other: {}  // For custom fields
    },
  });

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await vendorApi.getVendorServiceTypes();
        if (response.type === "success") {
          setServiceTypes(response.data);
        }
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleStepOneUpdate = (newData) => {
    console.log("Updating step one data:", newData);
    setStepOneData(prevData => {
      const updatedData = {
        ...prevData,
        ...newData
      };
      console.log("Updated step one data:", updatedData);
      return updatedData;
    });
  };

  const handlePackagesUpdate = (newPackages) => {
    setPackagesData(newPackages);
  };

  // Helper function to load an image from URL
  const loadImageFromUrl = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  // Helper function to compress an image
  const compressImage = async (input) => {
    if (!input) return null;

    try {
      let img;
      if (input instanceof File) {
        // If input is a File object
        const reader = new FileReader();
        const dataUrl = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(input);
        });
        img = await loadImageFromUrl(dataUrl);
      } else if (typeof input === 'string' && input.startsWith('data:')) {
        // If input is a data URL
        img = await loadImageFromUrl(input);
      } else if (typeof input === 'string') {
        // If input is a URL
        img = await loadImageFromUrl(input);
      } else {
        console.error('Invalid input type for image compression');
        return null;
      }

      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > MAX_IMAGE_SIZE) {
          height *= MAX_IMAGE_SIZE / width;
          width = MAX_IMAGE_SIZE;
        }
      } else {
        if (height > MAX_IMAGE_SIZE) {
          width *= MAX_IMAGE_SIZE / height;
          height = MAX_IMAGE_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
      });

      return new File([blob], 'compressed-image.jpg', {
        type: 'image/jpeg',
        lastModified: Date.now()
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      return null;
    }
  };

  // Helper function to compress multiple images
  const compressImages = async (files) => {
    if (!files || !files.length) return [];
    const compressedFiles = await Promise.all(
      files.map(file => compressImage(file))
    );
    return compressedFiles.filter(file => file !== null);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Prepare the service data according to the API format
      const serviceData = {
        name: stepOneData.serviceName,
        type: stepOneData.selectedServiceTypeName,
        category: stepOneData.selectedServiceTypeName,
        vendorId: user?.userId,
        description: stepOneData.description,
        located: "Sri Lanka",
        districts: stepOneData.locations,
        eventTypes: stepOneData.eventTypes,
        basic: {
          name: `${stepOneData.serviceName} Basic`,
          description: packagesData.basic.description,
          price: Number(packagesData.basic.price),
          expectedParticipants: Number(packagesData.basic.participants),
          other: packagesData.basic.other
        },
        standard: {
          name: `${stepOneData.serviceName} Standard`,
          description: packagesData.standard.description,
          price: Number(packagesData.standard.price),
          expectedParticipants: Number(packagesData.standard.participants),
          other: packagesData.standard.other
        },
        premium: {
          name: `${stepOneData.serviceName} Premium`,
          description: packagesData.premium.description,
          price: Number(packagesData.premium.price),
          expectedParticipants: Number(packagesData.premium.participants),
          other: packagesData.premium.other
        }
      };

      // Convert and compress images
      const serviceImages = await compressImages(packagesData.basic.images.slice(0, 3));
      const identificationFront = await compressImage(stepOneData.documents.identification);
      const identificationBack = await compressImage(stepOneData.documents.identification);
      const signature = await compressImage(stepOneData.documents.signature);
      const basicImages = await compressImages(packagesData.basic.images.slice(0, 3));
      const standardImages = await compressImages(packagesData.standard.images.slice(0, 3));
      const premiumImages = await compressImages(packagesData.premium.images.slice(0, 3));

      // Prepare compressed images
      const images = {
        serviceImages,
        identityImages: {
          front: identificationFront,
          back: identificationBack
        },
        eSignature: signature,
        basicImages,
        standardImages,
        premiumImages
      };

      const result = await vendorApi.createVendorService(serviceData, images);
      
      if (result.type === 'success') {
        // Show success alert about async processing
        addAlert(
          "Your service is being created. You will receive an email notification once the process is complete. You can check the status in your dashboard.",
          "success"
        );

        // Navigate to dashboard where they can see the pending service
        navigate('/vendor-dashboard');
      } else {
        const errorMessage = result.message || 'Failed to create service. Please try again.';
        addAlert(errorMessage, "error");
        setError(errorMessage);
      }
    } catch (err) {
      const errorMessage = 'Failed to create service. Please try again.';
      addAlert(errorMessage, "error");
      setError(errorMessage);
      console.error('Service creation error:', err);
    } finally {
      setLoading(false);
    }
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

      {error && (
        <Typography color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
          {error}
        </Typography>
      )}

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
              disabled={loading}
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
            disabled={loading}
          >
            {currentStep < 3 ? "Next" : (loading ? "Creating..." : "Done")}
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: active ? "#B88E2F" : completed ? "#8F8F8F" : "#1E1E1E",
        color: "#fff",
        fontSize: "24px",
      }}
    >
      {number}
    </div>
  );
};

export default VendorAccountForm;
