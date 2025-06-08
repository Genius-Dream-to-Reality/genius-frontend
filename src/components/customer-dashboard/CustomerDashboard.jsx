import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  Grid,
  Button,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../layout/DashboardHeader";
import { deleteEventById, getCustomerDetails, getEventDataForCustomer } from "../../api/customer-account";
import Sidebar from "../../layout/DashboardSideBar";
import { useSelector } from 'react-redux';

// --- Utility Functions ---
const mapEventStatus = (status, services) => {
  if (status === "PENDING_PAYMENT") return "Waiting for payment";
  if (status === "CANCELED") return "Canceled";
  if (status === "PENDING_APPROVAL") {
    const anyDeclined = services.some((s) => !s.vendorApproved);
    return anyDeclined ? "Waiting for Approval" : "Approved";
  }
  if (status === "COMPLETED") return "Successfully Completed";
  return status;
};

const getStatusColor = (status, services) => {
  if (status === "PENDING_PAYMENT") return "#f59e0b";
  if (status === "CANCELED") return "#dc2626";
  if (status === "COMPLETED") return "#16a34a";
  if (status === "PENDING_APPROVAL") {
    return services.some((s) => !s.vendorApproved) ?  "#dc2626" : "#22c55e";
  }
  return "#6b7280";
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

// --- Main Component ---
const CustomerDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [pendingEvents, setPendingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogMode, setDialogMode] = useState("confirm");
  const [dialogMessage, setDialogMessage] = useState("");
  const { user } = useSelector(state => state.auth);

  console.log("logged user: ",user);
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }

    // Fetch Events for customer
    getEventDataForCustomer(user.userId).then((res) => {
      if (res.type === "success") {
        const pending = [];
        const completed = [];

        res.data.forEach((event) => {
          const eventObj = {
            ...event,
            title: event.name,
            date: event.eventDate?.split("T")[0],
            fullDate: event.eventDate,
            location: event.location || "Unknown",
            status: mapEventStatus(event.status, event.services),
            statusColor: getStatusColor(event.status, event.services),
            payVisible: event.paymentStatus === "PENDING_PAYMENT",
          };

          if (event.status === "PENDING_APPROVAL" || event.status === "PENDING_PAYMENT") {
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
  }, [user, navigate]);

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
          onClick={() =>
            navigate("/view-plan", {
              state: {
                customerId: event.customerId,
                eventId: event.eventId,
              },
            })
          }
        >
          View
        </Button>
        <Button
          variant="contained"
          size="small"
          style={{ backgroundColor: "#dc2626", color: "#fff" }}
          onClick={() => handleCancelClick(event)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const handleImageChange = (file) => {
    console.log("New image selected:", file.name);
  };

  const handleCancelClick = (event) => {
    const isCompleted = ["Completed", "Canceled"].includes(event.status);
    if (isCompleted) {
      setDialogMessage("Do you want to delete this event?");
      setDialogMode("confirm");
      setSelectedEvent(event);
      setDialogOpen(true);
      return;
    }

    const daysDiff =
      (new Date(event.fullDate).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24);

    if (daysDiff >= 14) {
      setDialogMessage("Do you want to cancel this event?");
      setDialogMode("confirm");
    } else {
      setDialogMessage("You can only cancel events at least two weeks in advance.");
      setDialogMode("info");
    }

    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
    setDialogMessage("");
    setDialogMode("confirm");
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await deleteEventById(selectedEvent.eventId);

      if (response.type === "success") {
        console.log("Event deleted successfully:", response.data);
        // setEvents((prev) => prev.filter((ev) => ev.eventId !== selectedEvent.eventId));
      } else {
        console.error("Failed to delete event:", response.message);
      }
    } catch (error) {
      console.error("Unexpected error while deleting event:", error);
    } finally {
      handleCloseDialog();
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      <Grid container spacing={4} style={{ padding: "40px 20px 0" }}>
        {/* Sidebar */}
        <Sidebar
          isAuthenticated={!!user}
          userInfo={user}
          onImageChange={handleImageChange}
        />

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Pending Events */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Pending Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {pendingEvents.length > 0 ? (
                pendingEvents.map((event, index) =>
                  renderEventCard(event, index, true)
                )
              ) : (
                <p className="text-white">No pending events found.</p>
              )}
            </div>
          </section>

          {/* Completed Events */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Completed Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {completedEvents.length > 0 ? (
                completedEvents.map((event, index) =>
                  renderEventCard(event, index, false)
                )
              ) : (
                <p className="text-white">No completed events found.</p>
              )}
            </div>
          </section>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{ sx: dialogStyles.dialogPaper }}
      >
        <DialogContent sx={dialogStyles.dialogContent}>
          <Typography sx={dialogStyles.dialogTitle}>{dialogMessage}</Typography>
          <DialogActions sx={{ justifyContent: "center", marginTop: "20px" }}>
            {dialogMode === "confirm" ? (
              <>
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
              </>
            ) : (
              <Button
                onClick={handleCloseDialog}
                sx={dialogStyles.dialogButton}
                style={{ backgroundColor: "#6366f1" }}
              >
                OK
              </Button>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default CustomerDashboard;
