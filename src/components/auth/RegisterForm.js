import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  ThemeProvider,
  Grid,
  Box,
  Typography,
  InputBase,
  Button,
  FormControlLabel,
} from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import vendorRegister from "../../assets/images/why.png";
import googleCalendar from "../../assets/images/google-calendar.png";
import useStyles from "../../assets/css/style";
import { Checkbox } from "@mui/material";
import SideNavBar from "../../layout/SideNavBar";
import { customerRegistration, vendorRegistration } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const redirect_uri = process.env.REACT_APP_GOOGLE_CALENDER_REDIRECT_URI;
  const client_id = process.env.REACT_APP_GOOGLE_CALENDER_CLIENT_ID;
  const classes = useStyles();
  const location = useLocation();
  const { userType, from, oauthData } = location.state || {};
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isGoogleCalendarLinked, setIsGoogleCalendarLinked] = useState(false);
  const navigate = useNavigate();

  const [calendarId, setCalendarId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

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

  useEffect(() => {
    const savedForm = localStorage.getItem("registerFormData");

    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    }
    if (from === "callback") {
      //console.log("Auth Code from callbackpage: ", oauthData);

      if (oauthData) {
        try {
          setCalendarId(oauthData.calendarId);
          setAccessToken(oauthData.accessToken);
          setRefreshToken(oauthData.refreshToken);
          setTokenExpiry(oauthData.tokenExpiry);
          //console.log("AccessToken: ", accessToken);
          setIsGoogleCalendarLinked(true);
        } catch (err) {
          console.error("Failed to parse authObject:", err);
        }
      } else {
        console.log("No auth code found in local storage.");
      }
    }
  }, [from]);

 

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoogleCalendar = () => {
    localStorage.setItem("registerFormData", JSON.stringify(formData));
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/calendar&access_type=offline&prompt=consent`;
    window.location.href = googleAuthUrl;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      setMessage("You must accept the terms and conditions to continue.");
      setIsError(true);
      return; // stop submission
    }
    if (validateForm()) {
      const { confirmPassword, ...dataToSubmit } = formData;
      if (userType === "vendor") {
        const data = {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phoneNumber: formData.mobileNumber,
          password: formData.password,
          acceptTerms: formData.acceptTerms,
          calendarId: calendarId,
          accessToken: accessToken,
          refreshToken: refreshToken,
          tokenExpiry: tokenExpiry,
        };
        const res = await vendorRegistration(data);
        if (res.type === "error") {
          console.log("An error occurred:", res.message);
          setMessage(res.message);
          setIsError(true);
        } else {
          console.log("Success:", res.message);
          setMessage("Registration successful!");
          setIsError(false);
          navigate("/otp", {
            state: { userType: "vendor", email: formData.email },
          });
        }
      } else {
        const data = {
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          mobileNo: formData.mobileNumber,
          password: formData.password,
          acceptTerms: formData.acceptTerms,
        };

        const res = await customerRegistration(data);
        if (res.type === "error") {
          console.log("An error occurred:", res.message);
          setMessage(res.message);
          setIsError(true);
        } else {
          console.log("Success:", res.message);
          setMessage("Registration successful!");
          setIsError(false);
          localStorage.removeItem("registerFormData");
          navigate("/otp", {
            state: { userType: "customer", email: formData.email },
          });
        }
      }
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
            src={userType === "vendor" ? vendorRegister : authServiceImage}
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
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center", paddingTop: "40px" }}
          >
            <Typography style={{ fontSize: "32px" }}>
              Register as{" "}
              {userType === "vendor" ? "a Vendor" : "an Event Planner"}
            </Typography>
          </Grid>

          <form>
            <Grid container className={classes.formContent}>
              {[
                "firstName",
                "lastName",
                "email",
                "mobileNumber",
                "password",
                "confirmPassword",
              ].map((field, index) => (
                <Grid
                  item
                  container
                  xs={12}
                  md={12}
                  alignItems="center"
                  spacing={2}
                  style={{ marginBottom: "10px" }}
                  key={index}
                >
                  <Grid item xs={12} md={4}>
                    <Typography
                      className={classes.typo}
                      style={{ fontSize: "14px" }}
                    >
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <InputBase
                      className={classes.formInput}
                      type={
                        field.includes("password") ||
                        field.includes("confirmPassword")
                          ? "password"
                          : "text"
                      }
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
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: "20px" }}
                >
                  <Grid item>
                    <Typography
                      style={{ fontSize: "13px", textAlign: "center" }}
                    >
                      {isGoogleCalendarLinked ? (
                        <>
                          Your Google Calendar is linked successfully. <br />
                        </>
                      ) : (
                        <>
                          Please authorize Genius to access your Google Calendar
                          before proceeding. <br />
                          More info..
                        </>
                      )}
                    </Typography>
                  </Grid>

                  {!isGoogleCalendarLinked && (
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
                          textTransform: "none",
                        }}
                        onClick={handleGoogleCalendar}
                      >
                        Link Google Calendar
                        <img
                          src={googleCalendar}
                          alt="Google Calendar Icon"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Button>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Terms and Conditions Checkbox */}
              <Grid
                item
                container
                xs={12}
                justifyContent="center"
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label={
                    <span style={{ fontSize: "14px" }}>
                      Do you agree to our{" "}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() =>
                          console.log("Navigate to Privacy and Policies")
                        }
                      >
                        Privacy and Policies
                      </span>
                      ?
                    </span>
                  }
                />
              </Grid>

              {/* Submit Button */}
              <Grid item container xs={12} justifyContent="center">
                <Button
                  type="submit"
                  className={classes.submitButton}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

          {message && (
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <Typography
                style={{
                  color: isError ? "red" : "green",
                  fontSize: "14px",
                }}
              >
                {message}
              </Typography>
            </Grid>
          )}

          {/* Login Section (Button and Text on the Same Line) */}
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "30px" }}
          >
            <Grid item>
              <Typography className={classes.typo} style={{ fontSize: "14px" }}>
                Do you have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                type="submit"
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

export default RegisterForm;
