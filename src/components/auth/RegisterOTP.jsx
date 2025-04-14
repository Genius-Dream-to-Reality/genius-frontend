
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Grid, Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import SideNavBar from "../../layout/SideNavBar";
import useStyles from "../../assets/css/style";
import AppLogo from "../.././components/shared/AppLogo";
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const RegisterOTP = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [otp, setOtp] = useState('');

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
  Registration is Completed!
</Typography>


<Typography style={{
                fontSize: "16px",
                color: "#cac9c9",
                marginBottom: "80px",
              }}
            >
  A confirmation email is sent with an OTP
  <br />
  <br />
  <br/>
  <div className="flex justify-center items-center gap-4">
    The OTP
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span className="mx-2">-</span>} 
      renderInput={(props) => (
        <input
          {...props}
          className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md sm:w-20 sm:h-20 lg:w-24 lg:h-24 !important"
          
    style={{
      width: "3rem", 
      height: "3rem", 
    }}
        />
      )}
      
    />
  </div>
  <br />
  Didn't receive?{" "}
  <span className="text-blue-500 cursor-pointer">Resend</span>
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
                  confirm
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



export default RegisterOTP;