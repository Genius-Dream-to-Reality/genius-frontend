import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppLogo from "../shared/AppLogo";
import Header from "../../layout/Header";

const PaymentProcessing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Redirect to payment-success page after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/payment-success");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f0fc",
        display: "flex",
        flexDirection: "column",

        "& header button": {
          color: "black !important",
        },
        "& .MuiTypography-root": {
          color: "black !important",
        },
        "& header button svg": {
          color: "black !important",
        },
      }}
    >
      <Header />

      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: 3,
          my: isMobile ? 4 : 8,
          py: isMobile ? 4 : 8,
          px: isMobile ? 2 : 6,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          minHeight: isMobile ? "400px" : "500px",
        }}
      >
        {/* Logo */}
        <Box mb={4} display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ transform: "scale(1.2)", transformOrigin: "top center" }}>
            <AppLogo size="lg" />
          </Box>
        </Box>

        {/* Processing Message */}
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{ color: "black", mb: 3 }}
          gutterBottom
        >
          Processing Payment...
        </Typography>

        {/* Spinner */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: isMobile ? 60 : 80,
              height: isMobile ? 60 : 80,
              border: "6px solid #e0e0e0",
              borderTop: "6px solid #3b2a8d",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </Box>

        {/* Footer Links */}
        <Box
          component="footer"
          sx={{
            mt: "auto",
            pt: 4,
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{
              fontSize: 14,
              color: "gray",
              textAlign: "center",
            }}
          >
            <Grid item xs={12} sm="auto">
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </a>
            </Grid>
            <Grid item xs={12} sm="auto">
              <a href="/about-us" style={{ textDecoration: "none", color: "inherit" }}>
                About Us
              </a>
            </Grid>
            <Grid item xs={12} sm="auto">
              <a href="/contact-us" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
              </a>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Inline style for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default PaymentProcessing;
