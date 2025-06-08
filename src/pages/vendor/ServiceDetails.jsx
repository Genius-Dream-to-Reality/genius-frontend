import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocationOn, ArrowBack } from '@mui/icons-material';
import { vendorApi } from '../../api/vendor';
import { useSelector } from 'react-redux';

// Styled components
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

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const [service, setService] = useState(location.state?.service || null);
  const [loading, setLoading] = useState(!location.state?.service);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (location.state?.service) {
        return;
      }

      try {
        setLoading(true);
        const result = await vendorApi.getVendorServices(user.userId);
        if (result.type === 'success') {
          const serviceDetails = result.data.find(s => s.id === serviceId);
          if (serviceDetails) {
            setService(serviceDetails);
          } else {
            setError('Service not found');
          }
        } else {
          setError('Failed to fetch service details');
        }
      } catch (error) {
        setError('Error loading service details');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId && user?.userId && !service) {
      fetchServiceDetails();
    }
  }, [serviceId, user?.userId, location.state?.service, service]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress sx={{ color: '#EAB308' }} />
      </Box>
    );
  }

  if (error || !service) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={4}>
        <Typography variant="h5" color="error">
          {error || 'Service not found'}
        </Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/vendor-dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/vendor-dashboard')}
          sx={{ color: 'white' }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" color="white">
          Service Details
        </Typography>
        <Chip
          label={service.serviceStatus}
          sx={{
            backgroundColor: 
              service.serviceStatus === 'ACTIVE' ? '#22c55e' :
              service.serviceStatus === 'PENDING' ? '#eab308' : '#dc2626',
            color: 'white',
            ml: 'auto'
          }}
        />
      </Box>

      {/* Service Information Section */}
      <SectionCard>
        <SectionTitle>
          <Typography variant="h6">Service Information</Typography>
        </SectionTitle>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <InfoRow>
              <Typography sx={{ color: "#fff" }}>Service Name:</Typography>
              <Typography sx={{ color: "#fff" }}>
                {service.name}
              </Typography>
            </InfoRow>
            <InfoRow>
              <Typography sx={{ color: "#fff" }}>Service Type:</Typography>
              <Typography sx={{ color: "#fff" }}>
                {service.type}
              </Typography>
            </InfoRow>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: "#fff", mb: 1 }}>Description:</Typography>
            <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
              {service.description}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: "#fff", mb: 1 }}>Locations:</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {service.districts?.map((location) => (
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
            {service.eventTypes?.map((type) => (
              <StyledChip key={type} label={type} />
            ))}
          </Box>
        </Box>
      </SectionCard>

      {/* Packages Section */}
      <Grid container spacing={3}>
        {['basic', 'standard', 'premium'].map((type) => {
          const packageData = service[type];
          if (!packageData) return null;

          return (
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
                    {formatCurrency(packageData.price)}
                  </Typography>
                </InfoRow>

                <Box sx={{ my: 2 }}>
                  <Typography sx={{ color: "#fff", mb: 1 }}>
                    Description:
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "0.9rem" }}>
                    {packageData.description || "No description provided"}
                  </Typography>
                </Box>

                <InfoRow>
                  <Typography sx={{ color: "#fff" }}>Expected Participants:</Typography>
                  <Typography sx={{ color: "#fff" }}>
                    {packageData.expectedParticipants}
                  </Typography>
                </InfoRow>

                {packageData.other && Object.entries(packageData.other).length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ color: "#fff", mb: 1 }}>Additional Features:</Typography>
                    {Object.entries(packageData.other).map(([key, value]) => (
                      <InfoRow key={key}>
                        <Typography sx={{ color: "#fff", textTransform: "capitalize" }}>
                          {key}:
                        </Typography>
                        <Typography sx={{ color: "#fff" }}>
                          {value}
                        </Typography>
                      </InfoRow>
                    ))}
                  </Box>
                )}

                {packageData.images && packageData.images.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ color: "#fff", mb: 1 }}>Package Images:</Typography>
                    <ImageGrid>
                      {packageData.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${type} package ${index + 1}`}
                        />
                      ))}
                    </ImageGrid>
                  </Box>
                )}
              </SectionCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ServiceDetails;