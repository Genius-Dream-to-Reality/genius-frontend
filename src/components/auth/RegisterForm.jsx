import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  Grid,
  Box,
  Typography,
  InputBase,
  Button,
  FormControlLabel,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import googleCalendar from "../../assets/images/google-calendar.png";
import useStyles from "../../assets/css/style";
import SideNavBar from "../../layout/SideNavBar";
import AppLogo from "../shared/AppLogo";

const RegisterForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location.state || {};
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        {!isMobile && (
          <Grid item md={5} sx={{ position: "relative" }}>
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

        <Grid item md={7}>
          <Header />
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center", paddingTop: "40px" }}
          >
            <Typography style={styles.sectionHeading}>
              Register as {userType === "vendor" ? "a Vendor" : "an Event Planner"}
            </Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
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
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  style={{ marginBottom: "10px" }}
                  key={index}
                >
                  {/* Field Name */}
                  <Grid item xs={4} md={4}>
                    <Typography
                      className={classes.typo}
                      style={{ fontSize: "14px", textAlign: "left", whiteSpace: "nowrap" }}
                    >
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </Typography>
                  </Grid>

                  {/* Input Field */}
                  <Grid item xs={8} md={8}>
                    <InputBase
                      className={classes.formInput}
                      fullWidth
                      type={
                        field.includes("password") || field.includes("confirmPassword")
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
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      Please authorize Genius to access your Google Calendar
                      before proceeding. More info..
                    </Typography>
                  </Grid>

                  <Grid item style={{ marginTop: "20px" }}>
                    <Button
                      variant="contained"
                      style={styles.googleButton}
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
              )}

              {/* Terms and Conditions Checkbox */}
              <Grid item
                container
                xs={12}
                justifyContent="center"
                spacing={2}
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        name="acceptTerms"
                        sx={{ color: "#fff" }}
                      />
                    }
                    label={
                      <span style={{ fontSize: "14px" }}>
                        Do you agree to our{" "}
                        <span
                          style={{ color: "#007ADF", cursor: "pointer" }}
                          onClick={() =>
                            console.log("Navigate to Privacy and Policies")
                          }
                        >
                          Privacy and Policies
                        </span>
                        ?
                      </span>
                    }
                    sx={{ color: "#fff" }}
                  />
              </Grid>

              {/* Submit Button */}
              <Grid item container xs={12} justifyContent="center">
                <Button type="submit" style={styles.button}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Login Section */}
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "40px", marginBottom: "40px" }}
          >
            <Grid item>
              <Typography style={{ fontSize: "14px" }}>
                Do you have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => navigate("/login")}
                style={styles.linkButton}
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


export const styles = {
  button: {
    backgroundColor: "#4C3A74",
    color: "#FFFFFF",
    padding: "10px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    width: "220px",
    textTransform: "none",
    border: "2px solid #a0a5ee",
    marginTop: "20px"
  },
  linkButton: {
    backgroundColor: "#B07207",
    color: "#FFFFFF",
    padding: "8px 20px",
    fontSize: "14px",
    borderRadius: "8px",
    textTransform: "none",
  },
  googleButton: {
    backgroundColor: "#4C3A74",
    color: "#FFFFFF",
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textTransform: "none",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
  },
  sectionHeading: {
    fontSize: "42px",
    marginBottom: "25px",
  },
};
