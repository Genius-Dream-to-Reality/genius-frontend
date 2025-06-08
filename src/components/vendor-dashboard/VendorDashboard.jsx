import React, { useEffect, useState, useContext } from "react";
import {
  ThemeProvider,
  Grid,
  Button, 
  seTheme,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CalendarToday, LocationOn, AddCircleOutline, Visibility } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";
import Sidebar from "../../layout/DashboardSideBar";
import { useSelector } from 'react-redux';
import { vendorApi } from "../../api/vendor";
import { eventApi } from "../../api/event";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { AlertContext } from "../../contexts/AlertContext";

const VendorDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addAlert } = useContext(AlertContext);
  const { user, loading: authLoading } = useSelector(state => state.auth);

  const [vendorServices, setVendorServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [events, setEvents] = useState({
    pending: [],
    accepted: []
  });
  const [eventsLoading, setEventsLoading] = useState(false);

  const [selectedHall, setSelectedHall] = useState("Paradise Event Halls");
  const hallList = ["Paradise Event Halls", "Sunset Banquet", "Royal Garden"];

  const pendingEvents = [
    {
      title: "John Doe",
      type: "Wedding",
      date: "2025-03-05",
      location: "Gampaha",
      package: "Premium",
      status: "Pending",
    },
    {
      title: "Kevin Perera",
      type: "Birthday",
      date: "2025-01-04",
      location: "Gampaha",
      package: "Basic",
      status: "Pending",
    },
  ];

  const acceptedEvents = [
    {
      title: "Shanu Owens",
      type: "Wedding",
      date: "2023-08-15",
      location: "Gampaha",
      package: "Premium",
      status: "Accepted",
    },
    {
      title: "Raj's Birthday",
      type: "Birthday",
      date: "2024-06-04",
      location: "Colombo",
      package: "Basic",
      status: "Accepted",
    },
  ];

  // Redirect if not authenticated or not a vendor
  useEffect(() => {
    if (!authLoading && (!user || user.userType !== 'VENDOR')) {
//navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchVendorServices = async () => {
      if (!user?.userId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const result = await vendorApi.getVendorServices(user.userId);
        if (result.type === "success") {
          setVendorServices(result.data);
          if (result.data.length > 0) {
            const activeService = result.data.find(service => service.serviceStatus === 'ACTIVE');
            setSelectedService(activeService || result.data[0]);
          }
        } else {
          setError(result.message);
          if (result.status === 404) {
            setVendorServices([]);
            setSelectedService(null);
          }
        }
      } catch (error) {
        setError("Failed to fetch vendor services");
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.userId) {
      fetchVendorServices();
    }
  }, [user?.userId]);

  useEffect(() => {
    const fetchServiceEvents = async () => {
      if (!selectedService?.id) return;
      
      try {
        setEventsLoading(true);
        const result = await eventApi.getEventsByServiceId(selectedService.id);
        if (result.type === "success") {
          // Split events into pending and accepted
          const pendingEvents = result.data.filter(event => event.status === 'PENDING');
          const acceptedEvents = result.data.filter(event => event.status === 'ACCEPTED');
          setEvents({ pending: pendingEvents, accepted: acceptedEvents });
        } else {
          addAlert('Failed to fetch events', 'error');
        }
      } catch (error) {
        addAlert('Error loading events', 'error');
      } finally {
        setEventsLoading(false);
      }
    };

    fetchServiceEvents();
  }, [selectedService?.id]);

  const handleServiceChange = (event) => {
    const service = vendorServices.find(s => s.id === event.target.value);
    
    if (service.serviceStatus === 'PENDING') {
      addAlert('This service is pending approval and cannot be selected.', 'warning');
      return;
    }
    
    if (service.serviceStatus === 'INACTIVE') {
      addAlert('This service is currently inactive and cannot be selected.', 'error');
      return;
    }
    
    setSelectedService(service);
  };

  const handleAddService = () => {
    navigate("/vendor-account");
  };

  const handleViewServiceDetails = () => {
    if (selectedService?.id) {
      navigate(`/vendor/service/${selectedService.id}`, {
        state: { service: selectedService }
      });
    }
  };

  const renderEventCard = (event, index, isPending = false) => (
    <div
      key={index}
      className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-start mb-4"
    >
      <div className="w-full">
        <h3 className="text-lg font-bold uppercase text-black mb-2">{event.customerName || 'Customer'}</h3>
        <p className="text-black text-sm mb-1">
          <strong>Event:</strong> {event.eventType}
        </p>
        <div className="flex text-sm text-black items-center gap-6 mb-1">
          <span className="flex items-center">
            <CalendarToday style={{ fontSize: 16, marginRight: 4 }} />
            {new Date(event.eventDate).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <LocationOn style={{ fontSize: 16, marginRight: 4 }} />
            {event.location || 'Not specified'}
          </span>
        </div>
        <p className="text-black text-sm">
          <strong>Package:</strong>{" "}
          <span className={event.packageType === "Premium" ? "text-yellow-600" : "text-gray-500"}>
            {event.packageType}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 ml-4">
        {isPending ? (
          <>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#22c55e", color: "#fff" }}
              onClick={() => handleEventStatusUpdate(event.id, 'ACCEPTED')}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#dc2626", color: "#fff" }}
              onClick={() => handleEventStatusUpdate(event.id, 'REJECTED')}
            >
              Decline
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#22c55e", color: "#fff" }}
              onClick={() => handleEventStatusUpdate(event.id, 'CONFIRMED')}
            >
              Confirm Participation
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#0ea5e9", color: "#fff" }}
              onClick={() => handleEventInquiry(event.id)}
            >
              Inquiry
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const handleEventStatusUpdate = async (eventId, newStatus) => {
    try {
      const result = await eventApi.updateEventStatus(eventId, newStatus);
      if (result.type === "success") {
        addAlert(`Event ${newStatus.toLowerCase()} successfully`, 'success');
        // Refresh events
        const updatedResult = await eventApi.getEventsByServiceId(selectedService.id);
        if (updatedResult.type === "success") {
          const pendingEvents = updatedResult.data.filter(event => event.status === 'PENDING');
          const acceptedEvents = updatedResult.data.filter(event => event.status === 'ACCEPTED');
          setEvents({ pending: pendingEvents, accepted: acceptedEvents });
        }
      } else {
        addAlert('Failed to update event status', 'error');
      }
    } catch (error) {
      addAlert('Error updating event status', 'error');
    }
  };

  const handleEventInquiry = (eventId) => {
    // Implement inquiry functionality
    navigate(`/event-inquiry/${eventId}`);
  };

  const handleImageChange = (file) => {
    console.log("New image selected:", file.name);
  };

  const handleHallChange = (event) => {
    setSelectedHall(event.target.value);
  };

  const handleAddHall = () => {
    // You can replace this with a modal or navigation
    alert("Add Hall functionality triggered.");
  };

  const renderNoEventsMessage = (type) => (
    <div className="text-center py-8">
      <Typography variant="body1" color="white" sx={{ opacity: 0.8 }}>
        No {type} events at the moment
      </Typography>
    </div>
  );

  // Add styles for the status dot
  const getStatusDotStyle = (status) => ({
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginRight: '8px',
    backgroundColor: 
      status === 'ACTIVE' ? '#22c55e' :
      status === 'PENDING' ? '#eab308' : '#dc2626'
  });

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      {/* Service Selector */}
      {vendorServices.length > 0 && (
        <div style={{ position: "absolute", top: 90, right: 40, zIndex: 10 }}>
          <div className="flex items-center gap-2 bg-[#403557] px-3 py-1.5 rounded-md">
            <Select
              value={selectedService?.id || ''}
              onChange={handleServiceChange}
              className="bg-[#403557] text-white text-sm outline-none border-none"
              sx={{
                color: 'white',
                minWidth: '200px',
                '& .MuiSelect-select': {
                  paddingY: '2px',
                  paddingRight: '32px !important',
                  paddingLeft: '12px',
                  backgroundColor: '#403557',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSelect-icon': {
                  color: 'white',
                  right: '8px'
                }
              }}
              renderValue={(selected) => {
                const service = vendorServices.find(s => s.id === selected);
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={getStatusDotStyle(service?.serviceStatus)} />
                    {service?.name}
                  </Box>
                );
              }}
            >
              {vendorServices.map((service) => (
                <MenuItem
                  key={service.id}
                  value={service.id}
                  disabled={service.serviceStatus === 'PENDING' || service.serviceStatus === 'INACTIVE'}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'black',
                    padding: '8px 16px'
                  }}
                >
                  <div
                    title={`Status: ${service.serviceStatus}`}
                    style={getStatusDotStyle(service.serviceStatus)}
                  />
                  {service.name}
                </MenuItem>
              ))}
            </Select>

            <Tooltip title="View Service Details">
              <IconButton
                onClick={handleViewServiceDetails}
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>

            <button
              onClick={handleAddService}
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: "6px",
                padding: "2px 8px",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      <Grid container spacing={4} style={{ padding: "40px 20px 0" }}>
        {/* Sidebar */}
        <Sidebar
          isAuthenticated={true}
          userInfo={user}
          onImageChange={handleImageChange}
        />

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress sx={{ color: '#EAB308' }} />
            </div>
          ) : error && (!vendorServices || vendorServices.length === 0) ? (
            <div className="bg-[#403557] rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-white">Welcome!</h3>
              <p className="text-gray-300 mb-6">You haven't set up any services yet. Start by creating your first service to begin receiving bookings.</p>
              <Button
                variant="contained"
                startIcon={<AddCircleOutline />}
                onClick={handleAddService}
                sx={{
                  backgroundColor: "#EAB308",
                  color: "black",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#CA8A04"
                  }
                }}
              >
                Create New Service
              </Button>
            </div>
          ) : (
            <>
              {/* Pending Events */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Pending Events</h3>
                <div className="bg-[#403557] rounded-xl p-6">
                  {eventsLoading ? (
                    <div className="flex justify-center py-8">
                      <CircularProgress sx={{ color: '#EAB308' }} />
                    </div>
                  ) : events.pending.length > 0 ? (
                    events.pending.map((event, index) => renderEventCard(event, index, true))
                  ) : (
                    renderNoEventsMessage('pending')
                  )}
                </div>
              </section>

              {/* Accepted Events */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-white">Accepted Events</h3>
                <div className="bg-[#403557] rounded-xl p-6">
                  {eventsLoading ? (
                    <div className="flex justify-center py-8">
                      <CircularProgress sx={{ color: '#EAB308' }} />
                    </div>
                  ) : events.accepted.length > 0 ? (
                    events.accepted.map((event, index) => renderEventCard(event, index))
                  ) : (
                    renderNoEventsMessage('accepted')
                  )}
                </div>
              </section>
            </>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default VendorDashboard;
