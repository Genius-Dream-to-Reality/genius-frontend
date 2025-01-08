import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Grid, Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import SideNavBar from "../../layout/SideNavBar";
import useStyles from "../../assets/css/style";
import AppLogo from "../.././components/shared/AppLogo";

const RegisterCompleted = () => {
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
            <Typography style={{ fontSize: "42px", marginBottom: "40px", marginTop: "100px"}}>
              Congratulations!
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                color: "#cac9c9",
                marginBottom: "80px",
              }}
            >
              You have Succesfully registered to the Genius.
              <br />
              Login to use amazing features.
            </Typography>

            

            {/* Login Section */}
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
              style={{ marginTop: "80px" }}
            >
              
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

export default RegisterCompleted;