import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { LocationOn, Upload, Create } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { vendorApi } from "../../api/vendor";
import { eventTypeApi } from "../../api/event";
import { AlertContext } from "../../contexts/AlertContext";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#fff",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
});

const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.23)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
  },
  "& .MuiPaper-root": {
    backgroundColor: "#1a1a1a",
  },
  "& .MuiMenuItem-root": {
    color: "#fff",
  },
});

const StyledChip = styled(Chip)({
  backgroundColor: "rgba(7, 9, 99, 0.349)",
  color: "#fff",
  margin: "4px",
});

const UploadBox = styled(Box)(({ theme }) => ({
  border: "2px dashed rgba(255, 255, 255, 0.23)",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
}));

const StepOne = ({ formData, onFormUpdate }) => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventTypesLoading, setEventTypesLoading] = useState(false);
  const { addAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        setLoading(true);
        const response = await vendorApi.getVendorServiceTypes();
        console.log("Fetching vendor types response:", response);
        if (response?.type === "success" && Array.isArray(response.data)) {
          console.log("Setting vendor types:", response.data);
          setServiceTypes(response.data);
        } else {
          console.warn("Service types response format unexpected:", response);
          setServiceTypes([]);
          addAlert("Failed to load service types", "error");
        }
      } catch (error) {
        console.error("Error fetching service types:", error);
        setServiceTypes([]);
        addAlert("Failed to load service types", "error");
      } finally {
        setLoading(false);
      }
    };

    const fetchEventTypes = async () => {
      try {
        setEventTypesLoading(true);
        const response = await eventTypeApi.getAllEventTypes();
        if (response?.type === "success" && Array.isArray(response.data)) {
          setEventTypes(response.data);
        } else {
          console.warn("Event types response format unexpected:", response);
          setEventTypes([]);
          addAlert("Failed to load event types", "error");
        }
      } catch (error) {
        console.error("Error fetching event types:", error);
        setEventTypes([]);
        addAlert("Failed to load event types", "error");
      } finally {
        setEventTypesLoading(false);
      }
    };

    fetchServiceTypes();
    fetchEventTypes();
  }, []);

  useEffect(() => {
    console.log("Current service types:", serviceTypes);
    console.log("Current form data:", formData);
  }, [serviceTypes, formData]);

  const availableLocations = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Galle",
    "Matara",
    "Jaffna",
    "Batticaloa",
    "Trincomalee",
    "Anuradhapura",
  ];

  const handleInputChange = (field, value) => {
    console.log("Handling input change for field:", field, "with value:", value);
    onFormUpdate({
      ...formData,
      [field]: value,
    });
  };

  const handleRemoveLocation = (location) => {
    onFormUpdate({
      ...formData,
      locations: formData.locations.filter((loc) => loc !== location),
    });
  };

  const handleRemoveEventType = (eventTypeToRemove) => {
    onFormUpdate({
      ...formData,
      eventTypes: formData.eventTypes.filter((type) => type !== eventTypeToRemove),
    });
  };

  const handleAddLocation = (event) => {
    const location = event.target.value;
    if (!formData.locations.includes(location)) {
      onFormUpdate({
        ...formData,
        locations: [...formData.locations, location],
      });
    }
  };

  const handleAddEventType = (event) => {
    const eventTypeId = event.target.value;
    const selectedEventType = eventTypes.find(type => type.id === eventTypeId);
    if (selectedEventType && !formData.eventTypes.includes(selectedEventType.name)) {
      onFormUpdate({
        ...formData,
        eventTypes: [...formData.eventTypes, selectedEventType.name],
      });
    }
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      onFormUpdate({
        ...formData,
        documents: {
          ...formData.documents,
          [type]: file,
        },
      });
    }
  };

  return (
    <Grid container spacing={3} style={{ padding: "0 40px" }}>
      <Grid item xs={12} textAlign="center">
        <Typography
          variant="h4"
          style={{ color: "#fff", marginBottom: "20px", marginTop: "20px" }}
        >
          Initial Setup
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          fullWidth
          label="Service Name"
          value={formData.serviceName}
          onChange={(e) => handleInputChange("serviceName", e.target.value)}
          variant="outlined"
        />
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={7}>
          <StyledTextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Service Type
            </InputLabel>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '56px' }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
              </Box>
            ) : (
              <StyledSelect
                value={formData.selectedServiceType || ''}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const selectedType = serviceTypes.find(type => type.id === selectedValue);
                  console.log("Selected type:", selectedType);
                  
                  if (selectedType) {
                    onFormUpdate({
                      ...formData,
                      selectedServiceType: selectedType.id,
                      selectedServiceTypeName: selectedType.name
                    });
                  }
                }}
                label="Service Type"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1a1a1a",
                      "& .MuiMenuItem-root": {
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&.Mui-selected": {
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select a service type</em>
                </MenuItem>
                {Array.isArray(serviceTypes) && serviceTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            )}
          </FormControl>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Add Location
            </InputLabel>
            <StyledSelect
              value=""
              onChange={handleAddLocation}
              label="Add Location"
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#1a1a1a",
                    "& .MuiMenuItem-root": {
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&.Mui-selected": {
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                        },
                      },
                    },
                  },
                },
              }}
            >
              {availableLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              p: 2,
              minHeight: "56px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {formData.locations.map((location) => (
              <StyledChip
                key={location}
                label={location}
                onDelete={() => handleRemoveLocation(location)}
                icon={<LocationOn />}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Add Event Type
            </InputLabel>
            {eventTypesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '56px' }}>
                <CircularProgress size={24} sx={{ color: 'white' }} />
              </Box>
            ) : (
              <StyledSelect
                value=""
                onChange={handleAddEventType}
                label="Add Event Type"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#1a1a1a",
                      "& .MuiMenuItem-root": {
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                        },
                        "&.Mui-selected": {
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {Array.isArray(eventTypes) && eventTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              p: 2,
              minHeight: "56px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Array.isArray(formData.eventTypes) && formData.eventTypes.map((type) => (
              <StyledChip
                key={type}
                label={type}
                onDelete={() => handleRemoveEventType(type)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography style={{ color: "#fff", marginBottom: "10px" }}>
          Identification Document
        </Typography>
        <input
          type="file"
          id="identification"
          hidden
          onChange={(e) => handleFileUpload("identification", e)}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label htmlFor="identification">
          <UploadBox>
            <Upload sx={{ mb: 1 }} />
            <Typography>
              {formData.documents.identification
                ? formData.documents.identification.name
                : "Upload ID (NIC/License/Passport)"}
            </Typography>
          </UploadBox>
        </label>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography style={{ color: "#fff", marginBottom: "10px" }}>
          E-Signature
        </Typography>
        <input
          type="file"
          id="signature"
          hidden
          onChange={(e) => handleFileUpload("signature", e)}
          accept=".jpg,.jpeg,.png"
        />
        <label htmlFor="signature">
          <UploadBox>
            <Create sx={{ mb: 1 }} />
            <Typography>
              {formData.documents.signature
                ? formData.documents.signature.name
                : "Upload Signature"}
            </Typography>
          </UploadBox>
        </label>
      </Grid>
    </Grid>
  );
};

export default StepOne;
