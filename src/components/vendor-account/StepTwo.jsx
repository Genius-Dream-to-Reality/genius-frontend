import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  IconButton,
  Switch,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";

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

const StepTwo = () => {
  const [packages, setPackages] = useState({
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

  const handleChange = (packageType, field, value) => {
    setPackages((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (packageType, event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setPackages((prev) => ({
      ...prev,
      [packageType]: {
        ...prev[packageType],
        images: [...prev[packageType].images, ...newImages].slice(0, 4),
      },
    }));
  };

  const renderPackage = (type, title) => (
    <Grid item xs={12} md={4}>
      <PackageCard>
        <PackageTitle>
          <Typography variant="h6">{title}</Typography>
        </PackageTitle>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography sx={{ color: "#fff" }}>Enter the Price</Typography>
            <Typography sx={{ color: "#fff" }}>Rs:</Typography>
          </Box>
          <StyledTextField
            fullWidth
            size="small"
            value={packages[type].price}
            onChange={(e) => handleChange(type, "price", e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>Description</Typography>
          <StyledTextField
            fullWidth
            multiline
            rows={3}
            size="small"
            value={packages[type].description}
            onChange={(e) => handleChange(type, "description", e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography sx={{ color: "#fff" }}>Package Items</Typography>
            <IconButton size="small" sx={{ color: "#fff" }}>
              <Add />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            Number of Participants
          </Typography>
          <StyledTextField
            fullWidth
            size="small"
            value={packages[type].participants}
            onChange={(e) => handleChange(type, "participants", e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            Number of Staffs
          </Typography>
          <StyledTextField
            fullWidth
            size="small"
            value={packages[type].staffs}
            onChange={(e) => handleChange(type, "staffs", e.target.value)}
          />
        </Box>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#fff" }}>With A/C</Typography>
          <Switch
            checked={packages[type].hasAC}
            onChange={(e) => handleChange(type, "hasAC", e.target.checked)}
          />
        </Box>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#fff" }}>With Buffet</Typography>
          <Switch
            checked={packages[type].hasBuffet}
            onChange={(e) => handleChange(type, "hasBuffet", e.target.checked)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>Number of Rooms</Typography>
          <StyledTextField
            fullWidth
            size="small"
            value={packages[type].rooms}
            onChange={(e) => handleChange(type, "rooms", e.target.value)}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
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
        </Box>
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
