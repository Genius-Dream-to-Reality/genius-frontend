import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Grid, Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import SideNavBar from "../../layout/SideNavBar";
import useStyles from "../../assets/css/style";
import AppLogo from "../.././components/shared/AppLogo";

const UserTypeSelection = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleUserTypeSelect = (userType) => {
    navigate("/register", { state: { userType } });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        {/* <SideNavBar /> */}
        {!isMobile && (
        <Grid item md={5} sx={{ position: "relative" }}>
          <Box
            component="img"
            src={authServiceImage}
            alt="Choose User Type"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "0px",
              left: "20px",
              zIndex: 1,
            }}
          >
            <AppLogo size="lg" />
          </Box>
          <SideNavBar />
        </Grid>
        )}

        <Grid item  xs={12} md={7}>
          <Header />
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center", paddingTop: "40px" }}
          >
            <Typography style={{ fontSize: "42px", marginBottom: "40px" }}>
              Who are you?
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                color: "#cac9c9",
                marginBottom: "80px",
              }}
            >
              If you are here to plan your dream event choose "An Event
              Planner".
              <br />
              If you are here as a service provider choose "A Vendor".
            </Typography>

            <Grid container justifyContent="center" alignItems="center"  spacing={2} >
              <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#4C3A74",
                    color: "#FFFFFF",
                    padding: "15px 30px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    width: "220px",
                    textTransform: "none",
                    border: "2px solid #a0a5ee",
                  }}
                  onClick={() => handleUserTypeSelect("planner")}
                >
                  An Event Planner
                </Button>
              </Grid>
              <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#4C3A74",
                    color: "#FFFFFF",
                    padding: "15px 30px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    width: "220px",
                    textTransform: "none",
                    border: "2px solid #a0a5ee",
                  }}
                  onClick={() => handleUserTypeSelect("vendor")}
                >
                  A Vendor
                </Button>
              </Grid>
            </Grid>

            {/* Login Section */}
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
              style={{ marginTop: "80px" }}
            >
              <Grid item>
                <Typography
                  className={classes.typo}
                  style={{ fontSize: "14px" }}
                >
                  Do you have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navigate("/login")}
                  style={{
                    backgroundColor: "#B07207",
                    color: "#FFFFFF",
                    padding: "8px 20px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default UserTypeSelection;
