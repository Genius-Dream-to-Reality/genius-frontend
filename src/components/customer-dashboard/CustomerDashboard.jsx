import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Grid, Button, useTheme, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { CalendarToday, LocationOn, Settings } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";
import ProfileImageUploader from "../shared/ProfileImageUploader";
import { getEventDataForCustomer } from "../../utils/customer-account";


const CustomerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);


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
              event.status === "PENDING_PAYMENT"
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
    if (status === "PENDING_PAYMENT") return "Waiting for payment";
    if (status === "CANCELED") return "Canceled";
    if (status === "PENDING_APPROVAL") {
      const anyDeclined = services.some((s) => !s.vendorApproved);
      return anyDeclined ? "A vendor declined the event" : "Approved";
    }
    if (status === "COMPLETED") return "Successfully Completed";
    return status;
  };

  const getStatusColor = (status, services) => {
    if (status === "PENDING_PAYMENT") return "#f59e0b";
    if (status === "CANCELED") return "#dc2626";
    if (status === "COMPLETED") return "#16a34a";
    if (status === "PENDING_APPROVAL") {
      return services.some((s) => !s.vendorApproved) ? "#dc2626" : "#22c55e";
    }
    return "#6b7280";
  };

  const renderEventCard = (event, index, isPending = false) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-start mb-4"
    >
      <div className="w-full">
        <h3 className="text-xl font-bold text-black mb-3 uppercase tracking-wide">
          {event.title}
        </h3>
        <div className="text-sm text-black flex flex-wrap items-center gap-x-4 gap-y-1 mb-3">
          <span>
            <strong>Type:</strong> {event.type}
          </span>
          <span className="flex items-center">
            <CalendarToday style={{ fontSize: 16, marginRight: 4 }} />
            {event.date}
          </span>
          <span className="flex items-center">
            <LocationOn style={{ fontSize: 16, marginRight: 4 }} />
            {event.location}
          </span>
        </div>
        <p className="text-sm text-black">
          <strong>Status:</strong>{" "}
          <span style={{ color: event.statusColor }}>{event.status}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 ml-4">
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
          onClick={() => navigate("/view-plan", { // To do
            state: {
              customerId: event.customerId,
              eventId: event.eventId,
            },
          })}
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#dc2626", color: "#fff" }}
          onClick={handleCancelClick}
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

  const handleCancelClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Add your delete logic here
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{ sx: dialogStyles.dialogPaper }}
      >
        <DialogContent sx={dialogStyles.dialogContent}>
          <Typography sx={dialogStyles.dialogTitle}>
            Do you want to cancel this event?
          </Typography>

          <DialogActions sx={{ justifyContent: "center", marginTop: "20px" }}>
            <Button
              onClick={handleCloseDialog}
              sx={dialogStyles.dialogButton}
              style={{ backgroundColor: "#dc2626" }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirmDelete}
              sx={dialogStyles.dialogButton}
              style={{ backgroundColor: "#10b981" }}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </ThemeProvider>
  );
};

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
  dialogTitle: {
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "20px",
  },
  dialogButton: {
    height: "40px",
    width: "130px",
    color: "#FFFFFF",
    padding: "8px 20px",
    fontSize: "14px",
    borderRadius: "8px",
    textTransform: "none",
    display: "flex",
    alignItems: "center",
  },
};

export default CustomerDashboard;
