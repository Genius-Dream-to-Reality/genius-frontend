import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AppLogo from "../shared/AppLogo";
import Header from "../../layout/Header";

const Payment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f0fc",
        display: "flex",
        flexDirection: "column",

        // Force Header button color to black
        "& header button": {
          color: "black !important",
        },

        // Typography text inside the whole page (including inside Header)
        "& .MuiTypography-root": {
          color: "black !important",
        },

        // Icons inside header
        "& header button svg": {
          color: "black !important",
        },
      }}
    >
      {/* Top Navigation */}
      <Header />

      {/* Center Card */}
      <Container
        maxWidth="lg" // widened from "md"
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
        {/* Logo at the Top */}
        <Box mb={4} display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ transform: "scale(1.2)", transformOrigin: "top center" }}>
            <AppLogo size="lg" />
          </Box>
        </Box>

        {/* Success Message and Icon */}
        <Typography
          variant={isMobile ? "body1" : "h6"}
          sx={{ color: "black", mb: 3 }}
          gutterBottom
        >
          Payment Successful. Check your mail. Payment
        </Typography>

        <IconButton
          disableRipple
          sx={{
            "&:hover": { background: "transparent" },
            mb: 4,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: isMobile ? 60 : 80, color: "#3b2a8d" }} />
        </IconButton>

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
    </Box>
  );
};

export default Payment;
