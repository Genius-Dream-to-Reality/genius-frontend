import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider, Grid, Box, Typography, InputBase, Button, FormControlLabel } from "@mui/material";
import theme from "../../theme";
import Header from "../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import googleCalendar from "../../assets/images/google-calendar.png";
import useStyles from "../../assets/css/style";
import { CheckBox } from "@mui/icons-material";
import SideNavBar from "../layout/SideNavBar";

const RegisterComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  const { userType } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      formIsValid = false;
    }

    // Mobile number validation (10 digits only)
    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...dataToSubmit } = formData;
      console.log("Form Data:", dataToSubmit);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <SideNavBar />
        <Grid item md={5}>
          <Box
            component="img"
            src={authServiceImage}
            alt="Register"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item md={7}>
          <Header />
          <Grid item xs={12} md={12} style={{ textAlign: "center", paddingTop: "40px" }}>
            <Typography style={{ fontSize: "32px" }}>
              Register as {userType === "vendor" ? "a Vendor" : "an Event Planner"}
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container className={classes.formContent}>
              {["firstName", "lastName", "email", "mobileNumber", "password", "confirmPassword"].map((field, index) => (
                <Grid item container xs={12} md={12} alignItems="center" spacing={2} style={{ marginBottom: "10px" }} key={index}>
                  <Grid item xs={12} md={4}>
                    <Typography className={classes.typo} style={{ fontSize: "14px" }}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <InputBase
                      className={classes.formInput}
                      type={field.includes("password") || field.includes("confirmPassword") ? "password" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                    {errors[field] && (
                      <Typography style={{ color: "red", fontSize: "12px" }}>
                        {errors[field]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}

              {userType === "vendor" && (
                <>
                  <Grid container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: "20px" }}
                  >
                    <Grid item>
                      <Typography style={{ fontSize: "13px", textAlign: "center" }}>
                        Please authorize Genius to access your Google Calendar before proceeding. <br />
                        More info..
                      </Typography>
                    </Grid>

                    <Grid item style={{ marginTop: "20px" }}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#4C3A74",
                          color: "#FFFFFF",
                          padding: "10px 20px",
                          fontSize: "14px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          textTransform: "none"
                        }}
                        onClick={() => console.log("Link Google Calendar")}
                      >
                        Link Google Calendar
                        <img
                          src={googleCalendar}
                          alt="Google Calendar Icon"
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Terms and Conditions Checkbox */}
              <Grid item container xs={12} justifyContent="center" style={{ marginTop: "20px", marginBottom: "10px" }}>
                <FormControlLabel
                  control={
                    <CheckBox
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      name="acceptTerms"
                      color="primary"
                    />
                  }
                  label="Do you agree to our Privacy and Policies?"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item container xs={12} justifyContent="center">
                <Button type="submit"
                  className={classes.submitButton}
                // onClick={handleRegisterClick}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Login Section (Button and Text on the Same Line) */}
          <Grid container spacing={1} alignItems="center" justifyContent="center" style={{ marginTop: "30px" }}>
            <Grid item>
              <Typography className={classes.typo} style={{ fontSize: "14px" }}>
                Do you have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button type="submit"
                className={classes.submitButton}
                style={{ backgroundColor: "#B07207" }}
              // onClick={handleRegisterClick}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterComponent;
