import React from "react";
import { Grid, Typography, Box, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocationOn } from "@mui/icons-material";

const SectionCard = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "20px",
});

const SectionTitle = styled(Box)({
  backgroundColor: "rgba(184, 142, 47, 0.25)",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  marginBottom: "20px",
});

const InfoRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  "&:last-child": {
    borderBottom: "none",
  },
});

const StyledChip = styled(Chip)({
  backgroundColor: "rgba(7, 9, 99, 0.349)",
  color: "#fff",
  margin: "4px",
});

const ImageGrid = styled(Box)({
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

const StepThree = ({ initialSetup, packages }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h5"
        sx={{ color: "#fff", textAlign: "center", mb: 4 }}
      >
        Review Your Information
      </Typography>

      {/* Initial Setup Section */}
      <SectionCard>
        <SectionTitle>
          <Typography variant="h6">Service Information</Typography>
        </SectionTitle>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <Typography sx={{ color: "#fff" }}>Service Name:</Typography>
              <Typography sx={{ color: "#fff" }}>
                {initialSetup.serviceName}
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography sx={{ color: "#fff" }}>Service Type:</Typography>
              <Typography sx={{ color: "#fff" }}>
                {initialSetup.selectedServiceType}
              </Typography>
            </InfoRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "#fff", mb: 1 }}>Description:</Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
              {initialSetup.description}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>Locations:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {initialSetup.locations.map((location) => (
              <StyledChip
                key={location}
                label={location}
                icon={<LocationOn />}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>Event Types:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {initialSetup.eventTypes.map((type) => (
              <StyledChip key={type} label={type} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            Uploaded Documents:
          </Typography>
          <InfoRow>
            <Typography sx={{ color: "#fff" }}>Identification:</Typography>
            <Typography sx={{ color: "#fff" }}>
              {initialSetup.documents.identification?.name || "Not uploaded"}
            </Typography>
          </InfoRow>
          <InfoRow>
            <Typography sx={{ color: "#fff" }}>Signature:</Typography>
            <Typography sx={{ color: "#fff" }}>
              {initialSetup.documents.signature?.name || "Not uploaded"}
            </Typography>
          </InfoRow>
        </Box>
      </SectionCard>

      {/* Packages Section */}
      <Grid container spacing={3}>
        {Object.entries(packages).map(([type, data]) => (
          <Grid item xs={12} md={4} key={type}>
            <SectionCard>
              <SectionTitle>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {type} Package
                </Typography>
              </SectionTitle>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>Price:</Typography>
                <Typography sx={{ color: "#fff" }}>
                  {formatCurrency(data.price)}
                </Typography>
              </InfoRow>

              <Box sx={{ my: 2 }}>
                <Typography sx={{ color: "#fff", mb: 1 }}>
                  Description:
                </Typography>
                <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
                  {data.description || "No description provided"}
                </Typography>
              </Box>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>Participants:</Typography>
                <Typography sx={{ color: "#fff" }}>
                  {data.participants || 0}
                </Typography>
              </InfoRow>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>Staff Members:</Typography>
                <Typography sx={{ color: "#fff" }}>
                  {data.staffs || 0}
                </Typography>
              </InfoRow>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>Rooms:</Typography>
                <Typography sx={{ color: "#fff" }}>
                  {data.rooms || 0}
                </Typography>
              </InfoRow>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>AC Available:</Typography>
                <Typography sx={{ color: "#fff" }}>
                  {data.hasAC ? "Yes" : "No"}
                </Typography>
              </InfoRow>

              <InfoRow>
                <Typography sx={{ color: "#fff" }}>
                  Buffet Available:
                </Typography>
                <Typography sx={{ color: "#fff" }}>
                  {data.hasBuffet ? "Yes" : "No"}
                </Typography>
              </InfoRow>

              {data.images && data.images.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: "#fff", mb: 1 }}>Images:</Typography>
                  <ImageGrid>
                    {data.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Package ${type} image ${index + 1}`}
                      />
                    ))}
                  </ImageGrid>
                </Box>
              )}
            </SectionCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StepThree;
