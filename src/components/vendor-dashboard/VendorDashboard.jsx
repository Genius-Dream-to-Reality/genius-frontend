import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  Grid,
  Button, 
  useTheme,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { CalendarToday, LocationOn, AddCircleOutline } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";
import Sidebar from "../../layout/DashboardSideBar";
import { useSelector } from 'react-redux';
import { vendorApi } from "../../api/vendor";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useSelector(state => state.auth);

  // Add this console log to debug user data
  console.log('User data in VendorDashboard:', user);

  const [vendorServices, setVendorServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      navigate('/login');
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
            setSelectedService(result.data[0]);
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
  }, [user?.userId, navigate]);

  const handleServiceChange = (event) => {
    const service = vendorServices.find(s => s.id === event.target.value);
    setSelectedService(service);
  };

  const handleAddService = () => {
    navigate("/vendor-account");
  };

  const renderEventCard = (event, index, isPending = false) => (
    <div
      key={index}
      className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-start mb-4"
    >
      <div className="w-full">
        <h3 className="text-lg font-bold uppercase text-black mb-2">{event.title}</h3>
        <p className="text-black text-sm mb-1">
          <strong>Event:</strong> {event.type}
        </p>
        <div className="flex text-sm text-black items-center gap-6 mb-1">
          <span className="flex items-center">
            <CalendarToday style={{ fontSize: 16, marginRight: 4 }} />
            {event.date}
          </span>
          <span className="flex items-center">
            <LocationOn style={{ fontSize: 16, marginRight: 4 }} />
            {event.location}
          </span>
        </div>
        <p className="text-black text-sm">
          <strong>Package:</strong>{" "}
          <span className={event.package === "Premium" ? "text-yellow-600" : "text-gray-500"}>
            {event.package}
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
            >
              Accept
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#dc2626", color: "#fff" }}
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
            >
              Confirm Participation
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{ backgroundColor: "#dc2626", color: "#fff" }}
            >
              Inquiry
            </Button>
          </>
        )}
      </div>
    </div>
  );

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

  const renderNoServicesMessage = () => (
    <div className="bg-[#403557] rounded-xl p-8 text-center mt-8">
      <AddCircleOutline sx={{ fontSize: 64, color: '#EAB308', mb: 2 }} />
      <h3 className="text-2xl font-semibold mb-4 text-white">
        No Services Available
      </h3>
      <p className="text-gray-300 mb-6">
        You haven't created any services yet. Start by creating your first service to begin receiving bookings!
      </p>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={handleAddService}
        style={{
          backgroundColor: "#EAB308",
          color: "black",
          padding: "10px 24px",
          fontSize: "1rem"
        }}
      >
        Create New Service
      </Button>
    </div>
  );

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
            <select
              value={selectedService?.id}
              onChange={handleServiceChange}
              className="bg-[#403557] text-white text-sm outline-none border-none"
              style={{ paddingRight: 12 }}
            >
              {vendorServices.map((service) => (
                <option key={service.id} value={service.id} className="text-black">
                  {service.name}
                </option>
              ))}
            </select>

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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : error && (!vendorServices || vendorServices.length === 0) ? (
            <div className="bg-[#403557] rounded-xl p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4 text-white">
                Welcome {user?.username || 'Vendor'}!
              </h3>
              <p className="text-gray-300 mb-6">You haven't set up any services yet. Start by creating your first service to begin receiving bookings.</p>
              <button
                onClick={handleAddService}
                style={{
                  backgroundColor: "#4CAF50",
                  borderRadius: "6px",
                  padding: "8px 16px",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                + Add Service
              </button>
            </div>
          ) : (
            <>
              {/* Pending Events */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Pending Events</h3>
                <div className="bg-[#403557] rounded-xl p-6">
                  {pendingEvents.length > 0 ? (
                    pendingEvents.map((event, index) => renderEventCard(event, index, true))
                  ) : (
                    <p className="text-gray-300 text-center">No pending events</p>
                  )}
                </div>
              </section>

              {/* Accepted Events */}
              <section>
                <h3 className="text-xl font-semibold mb-4 text-white">Accepted Events</h3>
                <div className="bg-[#403557] rounded-xl p-6">
                  {acceptedEvents.length > 0 ? (
                    acceptedEvents.map((event, index) => renderEventCard(event, index))
                  ) : (
                    <p className="text-gray-300 text-center">No accepted events</p>
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
