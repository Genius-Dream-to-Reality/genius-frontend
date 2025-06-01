import React, { useEffect, useState } from "react";
import { ThemeProvider, Grid, Button, useTheme } from "@mui/material";
import { CalendarToday, Settings } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";
import ProfileImageUploader from "../shared/ProfileImageUploader";
import { getEventDataForCustomer } from "../../utils/customer-account";


const CustomerDashboard = () => {

  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [pendingEvents, setPendingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("userInfo");

    if (savedAuth === "true" && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUserInfo(parsedUser);

      getEventDataForCustomer("abc123").then((res) => { //todo
        if (res.type === "success") {
          const pending = [];
          const completed = [];

          res.data.forEach((event) => {
            const eventObj = {
              title: event.name,
              type: event.type,
              date: event.eventDate?.split("T")[0],
              location: event.location || "Unknown",
              status: mapEventStatus(event.status, event.services),
              statusColor: getStatusColor(event.status, event.services),
              payVisible: event.paymentStatus === "PENDING_PAYMENT",
            };

            // Categorize based on status
            if (
              event.status === "PENDING_APPROVAL" ||
              event.status === "ACTIVE"
            ) {
              pending.push(eventObj);
            } else {
              completed.push(eventObj);
            }
          });

          setPendingEvents(pending);
          setCompletedEvents(completed);
        } else {
          console.error("Failed to load events:", res.message);
        }
      });
    }
  }, []);

  const mapEventStatus = (status, services) => {
    if (status === "PENDING_APPROVAL") return "Waiting for payment";
    if (status === "CANCELED") return "Canceled";
    if (status === "ACTIVE") {
      const anyDeclined = services.some((s) => !s.vendorApproved);
      return anyDeclined ? "A vendor declined the event" : "Approved";
    }
    if (status === "COMPLETED") return "Successfully Completed";
    return status;
  };

  const getStatusColor = (status, services) => {
    if (status === "PENDING_APPROVAL") return "#f59e0b"; 
    if (status === "CANCELED") return "#dc2626"; 
    if (status === "COMPLETED") return "#16a34a"; 
    if (status === "ACTIVE") {
      return services.some((s) => !s.vendorApproved) ? "#dc2626" : "#22c55e";
    }
    return "#6b7280"; 
  };

  const renderEventCard = (event, index, isPending = false) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center mb-3"
    >
      <div>
        <h3 className="font-semibold uppercase tracking-wide text-sm text-black">
          {event.title}
        </h3>
        <p className="text-sm text-black">
          <strong>Event:</strong> {event.type}
          <span className="mx-2">
            <CalendarToday className="text-xs" style={{ fontSize: "16px" }} />
          </span>
          {event.date} – {event.location}
        </p>
        <p className="text-sm mt-1 text-black">
          <strong>Event Status:</strong>
          <span className="ml-1" style={{ color: event.statusColor }}>
            {event.status}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        {isPending && event.payVisible && (
          <Button
            variant="contained"
            size="small"
            style={{ backgroundColor: "#22c55e", color: "#fff" }}
          >
            Pay
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#10b981", color: "#fff" }}
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#dc2626", color: "#fff" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const handleImageChange = (file) => {
    // Optional: Handle server upload or notify parent
    console.log("New image selected:", file.name);
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      <Grid
        container
        spacing={4}
        style={{ paddingTop: "40px", paddingLeft: "20px", paddingRight: "20px" }}
      >
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <div className="flex flex-col items-center pt-16">
            <ProfileImageUploader onImageChange={handleImageChange} />

            <h2 className="text-xl mt-4 font-medium text-white">
              {isAuthenticated ? userInfo?.username : "Guest"}
            </h2>

            <div className="flex items-center mt-2 text-sm gap-1 text-gray-300 cursor-pointer hover:text-white">
              <Settings fontSize="small" /> Setting
            </div>
          </div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Pending Events
            </h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {pendingEvents.length > 0 ? (
                pendingEvents.map((event, index) => (
                  <Grid item xs={12} key={index}>
                    {renderEventCard(event, index, true)}
                  </Grid>
                ))
              ) : (
                <p className="text-white">No pending events found.</p>
              )}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Completed Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {completedEvents.length > 0 ? (
                completedEvents.map((event, index) => (
                  <Grid item xs={12} key={index}>
                    {renderEventCard(event, index, false)}
                  </Grid>
                ))
              ) : (
                <p className="text-white">No completed events found.</p>
              )}
            </div>
          </section>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CustomerDashboard;
