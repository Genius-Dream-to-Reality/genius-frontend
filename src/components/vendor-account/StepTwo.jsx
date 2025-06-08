import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  IconButton,
  Switch,
  Button,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Delete } from "@mui/icons-material";

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
  color: "#fff",
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
});

const PackageCard = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  padding: "20px",
  height: "100%",
}));

const PackageTitle = styled(Box)({
  backgroundColor: "rgba(184, 142, 47, 0.25)",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  marginBottom: "20px",
});

const ImagePreviewBox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
  marginTop: "10px",
  "& img": {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
  },
});

// Add MenuProps to be used with StyledSelect
const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "rgba(26, 26, 26, 0.95)",
      border: "1px solid rgba(255, 255, 255, 0.23)",
      "& .MuiMenuItem-root": {
        color: "#fff",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.1)",
        },
        "&.Mui-selected": {
          bgcolor: "rgba(255, 255, 255, 0.15)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
    },
  },
};

const StepTwo = ({ packages, onPackagesUpdate }) => {
  const [customFields, setCustomFields] = useState({
    basic: [],
    standard: [],
    premium: []
  });

  const handlePackageChange = (packageType, field, value) => {
    onPackagesUpdate({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        [field]: value,
      },
    });
  };

  const addCustomField = (packageType) => {
    const newField = {
      id: Date.now(),
      key: "",
      type: "text",
      value: ""
    };
    
    setCustomFields(prev => ({
      ...prev,
      [packageType]: [...prev[packageType], newField]
    }));

    // Update package data
    const updatedOther = { ...packages[packageType].other };
    onPackagesUpdate({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        other: updatedOther
      }
    });
  };

  const handleCustomFieldChange = (packageType, fieldId, changes) => {
    setCustomFields(prev => ({
      ...prev,
      [packageType]: prev[packageType].map(field => 
        field.id === fieldId ? { ...field, ...changes } : field
      )
    }));

    // Update package data
    const updatedFields = customFields[packageType].map(field => 
      field.id === fieldId ? { ...field, ...changes } : field
    );
    
    const updatedOther = {};
    updatedFields.forEach(field => {
      if (field.key) {
        updatedOther[field.key] = field.value;
      }
    });

    onPackagesUpdate({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        other: updatedOther
      }
    });
  };

  const removeCustomField = (packageType, fieldId) => {
    setCustomFields(prev => ({
      ...prev,
      [packageType]: prev[packageType].filter(field => field.id !== fieldId)
    }));

    // Update package data
    const updatedFields = customFields[packageType].filter(field => field.id !== fieldId);
    const updatedOther = {};
    updatedFields.forEach(field => {
      if (field.key) {
        updatedOther[field.key] = field.value;
      }
    });

    onPackagesUpdate({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        other: updatedOther
      }
    });
  };

  const handleImageUpload = (packageType, event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    onPackagesUpdate({
      ...packages,
      [packageType]: {
        ...packages[packageType],
        images: [...packages[packageType].images, ...newImages].slice(0, 4),
      },
    });
  };

  const renderPackage = (type, title) => (
    <Grid item xs={12} md={4}>
      <PackageCard>
        <PackageTitle>
          <Typography variant="h6">{title}</Typography>
        </PackageTitle>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Price"
              type="number"
              value={packages[type].price}
              onChange={(e) => handlePackageChange(type, "price", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={packages[type].description}
              onChange={(e) => handlePackageChange(type, "description", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Expected Participants"
              type="number"
              value={packages[type].participants}
              onChange={(e) => handlePackageChange(type, "participants", e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              fullWidth
              label="Staff Members"
              type="number"
              value={packages[type].staffs}
              onChange={(e) => handlePackageChange(type, "staffs", e.target.value)}
            />
          </Grid>

          {/* Custom Fields */}
          {customFields[type].map((field) => (
            <Grid item xs={12} key={field.id} container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <StyledTextField
                  fullWidth
                  label="Field Name"
                  value={field.key}
                  onChange={(e) => handleCustomFieldChange(type, field.id, { key: e.target.value })}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <StyledSelect
                    value={field.type}
                    onChange={(e) => handleCustomFieldChange(type, field.id, { type: e.target.value, value: e.target.value === 'checkbox' ? false : '' })}
                    MenuProps={menuProps}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="checkbox">Checkbox</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                {field.type === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => handleCustomFieldChange(type, field.id, { value: e.target.checked })}
                        sx={{ color: '#fff' }}
                      />
                    }
                    label="Value"
                    sx={{ color: '#fff' }}
                  />
                ) : (
                  <StyledTextField
                    fullWidth
                    label="Value"
                    value={field.value}
                    onChange={(e) => handleCustomFieldChange(type, field.id, { value: e.target.value })}
                  />
                )}
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => removeCustomField(type, field.id)} sx={{ color: '#fff' }}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              startIcon={<Add />}
              onClick={() => addCustomField(type)}
              variant="outlined"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255, 255, 255, 0.23)',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Add Custom Field
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ color: "#fff" }}>Images</Typography>
              <input
                accept="image/*"
                type="file"
                multiple
                hidden
                id={`image-upload-${type}`}
                onChange={(e) => handleImageUpload(type, e)}
              />
              <label htmlFor={`image-upload-${type}`}>
                <Button
                  component="span"
                  variant="contained"
                  size="small"
                  startIcon={<Add />}
                  sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", boxShadow: "none" }}
                >
                  Add
                </Button>
              </label>
            </Box>
            <ImagePreviewBox>
              {packages[type].images.map((image, index) => (
                <img key={index} src={image} alt={`Preview ${index + 1}`} />
              ))}
            </ImagePreviewBox>
          </Grid>
        </Grid>
      </PackageCard>
    </Grid>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ color: "#fff", textAlign: "center", mb: 3 }}
      >
        Paradise Event Halls
      </Typography>
      <Grid container spacing={3}>
        {renderPackage("basic", "Basic")}
        {renderPackage("standard", "Standard")}
        {renderPackage("premium", "Premium")}
      </Grid>
    </Box>
  );
};

export default StepTwo;
