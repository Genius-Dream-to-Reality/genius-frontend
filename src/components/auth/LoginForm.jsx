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

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { userType } = location.state || {};
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
             Login
            </Typography>
          </Grid>

          <form >
            <Grid container className={classes.formContent}>
              {[
                "email",
                "password",
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
                    {/* {errors[field] && (
                      <Typography style={{ color: "red", fontSize: "12px" }}>
                        {errors[field]}
                      </Typography>
                    )} */}
                  </Grid>
                </Grid>
              ))}


              {/* Submit Button */}
              <Grid item container xs={12} justifyContent="center">
                <Button type="submit" style={styles.button}>
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            style={{ marginTop: "40px", marginBottom: "40px" }}
          >
            <Grid item>
              <Typography style={{ fontSize: "14px" }}>
                Don't you have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => navigate("/login")}
                style={styles.linkButton}
              >
                Register
              </Button>
            </Grid>
          </Grid>
          </form>
        </Grid>

       
     
         </Grid>
    </ThemeProvider>
  );
};

export default LoginForm;


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
