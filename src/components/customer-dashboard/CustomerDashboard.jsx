import React, { useEffect, useState } from "react";
import { ThemeProvider, Grid, Button, useTheme } from "@mui/material";
import { CalendarToday, Settings } from "@mui/icons-material";
import DashboardHeader from "../../layout/DashboardHeader";

const events = {
  pending: [
    {
      title: "My Wedding",
      type: "Wedding",
      date: "2025-03-05",
      location: "Gampaha",
      status: "Waiting for payment",
      statusColor: "#f59e0b",
      payVisible: true,
    },
    {
      title: "Kev's Birthday",
      type: "Birthday",
      date: "2025-01-04",
      location: "Gampaha",
      status: "A vendor declined the event",
      statusColor: "#dc2626",
      payVisible: false,
    },
  ],
  completed: [
    {
      title: "Sis's Wedding",
      type: "Wedding",
      date: "2023-08-15",
      location: "Gampaha",
      status: "Successfully Completed",
      statusColor: "#16a34a",
    },
    {
      title: "Raj's Birthday",
      type: "Birthday",
      date: "2024-06-04",
      location: "Colombo",
      status: "Canceled",
      statusColor: "#dc2626",
    },
  ],
};

const CustomerDashboard = () => {

  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("userInfo");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);

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
          <Button variant="contained" size="small" style={{ backgroundColor: '#22c55e', color: '#fff' }}>Pay</Button>
        )}
        <Button variant="contained" size="small" style={{ backgroundColor: '#10b981', color: '#fff' }}>View</Button>
        <Button variant="contained" size="small" style={{ backgroundColor: '#dc2626', color: '#fff' }}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      <Grid container spacing={4} style={{ paddingTop: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <div className="flex flex-col items-center pt-16">
            <div className="w-48 h-48 rounded-full border-8 border-[#403557] overflow-hidden">{/* dark blue ring */}
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {isAuthenticated ? (
              <h2 className="text-xl mt-4 font-medium text-white">{userInfo?.username}</h2>
            ) : (
              <h2 className="text-xl mt-4 font-medium text-white">Guest</h2>
            )}

            <div className="flex items-center mt-2 text-sm gap-1 text-gray-300 cursor-pointer hover:text-white">
              <Settings fontSize="small" /> Setting
            </div>
          </div>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Pending Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {events.pending.map((event, index) => (
                <Grid item xs={12} key={index}>
                  {renderEventCard(event, index, true)}
                </Grid>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Completed Events</h3>
            <div className="bg-[#403557] rounded-xl p-6">
              {events.completed.map((event, index) => (
                <Grid item xs={12} key={index}>
                  {renderEventCard(event, index, true)}
                </Grid>
              ))}
            </div>
          </section>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default CustomerDashboard;
