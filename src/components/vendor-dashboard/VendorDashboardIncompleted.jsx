import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Grid, useTheme, Typography, Button } from "@mui/material";
import DashboardHeader from "../../layout/DashboardHeader";
import { Settings } from "@mui/icons-material";
import { FaArrowAltCircleRight } from "react-icons/fa";

const VendorDashboardIncompleted = () => {
  const navigate = useNavigate();
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

  const handleNavigation = () => {
    navigate("/register");
  };


  return (
    <ThemeProvider theme={theme}>
      <DashboardHeader />

      <Grid container spacing={4} style={{ paddingTop: "40px", paddingLeft: "20px", paddingRight: "20px" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={8}>
          <Grid item xs={12} md={12}
            style={{
              textAlign: "center",
              paddingTop: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: "42px",
                marginBottom: "40px",
                marginTop: "100px",
                color: "#fff",
              }}
            >
              You have not Completed <br /> Your Profile!
            </Typography>

            <Button
              onClick={handleNavigation}
              variant="contained"
              style={{
                backgroundColor: "#B07207",
                color: "#000",
                fontWeight: "600",
                padding: "10px 20px",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Get Started
              <FaArrowAltCircleRight style={{ transition: "transform 0.3s" }} />
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </ThemeProvider>
  );
};

export default VendorDashboardIncompleted;