import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";
import Sidebar from "../../layout/DashboardSideBar";

const VendorDashboard = () => {
  const theme = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState("");
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
      title: "Raj’s Birthday",
      type: "Birthday",
      date: "2024-06-04",
      location: "Colombo",
      package: "Basic",
      status: "Accepted",
    },
  ];

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("userInfo");
    if (savedAuth === "true" && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUserInfo(parsedUser);
    }
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      {/* Selector under*/}
      {/* Floating Hall Selector under Logout */}
      <div style={{ position: "absolute", top: 90, right: 40, zIndex: 10 }}>
        <div className="flex items-center gap-2 bg-[#403557] px-3 py-1.5 rounded-md">
          <select
            value={selectedHall}
            onChange={handleHallChange}
            className="bg-[#403557] text-white text-sm outline-none border-none"
            style={{ paddingRight: 12 }}
          >
            {hallList.map((hall) => (
              <option key={hall} value={hall} className="text-black">
                {hall}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddHall}
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

      <Grid container spacing={4} style={{ padding: "40px 20px 0" }}>
        {/* Sidebar */}
        <Sidebar
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
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

          {/* Accepted Events */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Accepted Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {acceptedEvents.length > 0 ? (
                acceptedEvents.map((event, index) =>
                  renderEventCard(event, index, false)
                )
              ) : (
                <p className="text-white">No accepted events found.</p>
              )}
            </div>
          </section>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default VendorDashboard;
