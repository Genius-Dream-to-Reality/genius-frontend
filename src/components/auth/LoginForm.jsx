import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThemeProvider,
  Grid,
  Box,
  Typography,
  InputBase,
  Button,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
} from "@mui/material";
import theme from "../../styles/theme";
import Header from "../../layout/Header";
import authServiceImage from "../../assets/images/authService.jpg";
import useStyles from "../../assets/css/style";
import SideNavBar from "../../layout/SideNavBar";
import AppLogo from "../shared/AppLogo";

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trimStart(),
    }));
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
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
            <Typography style={styles.sectionHeading}>Login</Typography>
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container className={classes.formContent} spacing={2}>
              {/* Type Selection */}
              <Grid item container xs={12} spacing={1} alignItems="center">
                <Grid item xs={4}>
                  <Typography
                    className={classes.typo}
                    style={{
                      fontSize: "14px",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Type:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    row
                    value={formData.type}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel
                      value="Event Planner"
                      control={<CustomRadio />}
                      label="Event Planner"
                    />
                    <FormControlLabel
                      value="Vendor"
                      control={<CustomRadio />}
                      label="Vendor"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              {/* Email and Password Fields */}
              {["email", "password"].map((field, index) => (
                <Grid
                  item
                  container
                  xs={12}
                  alignItems="center"
                  spacing={1}
                  key={index}
                >
                  <Grid item xs={4}>
                    <Typography
                      className={classes.typo}
                      style={{
                        fontSize: "14px",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {field === "email" ? "Your Email" : "Password"}:
                    </Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <InputBase
                      aria-label={field}
                      className={classes.formInput}
                      fullWidth
                      type={field.includes("password") ? "password" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                    {errors[field] && (
                      <Typography style={styles.errorText}>
                        {errors[field]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              ))}

              {/* Submit Button */}
              <Grid item container xs={12} justifyContent="center">
                <Button type="submit"
                  onClick={() => navigate("/")}
                  style={styles.button}
                >
                  Login
                </Button>
              </Grid>
            </Grid>

            {/* Registration Link */}
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
              style={{ marginTop: "120px" }}
            >
              <Grid item>
                <Typography style={{ fontSize: "14px" }}>
                  Don’t have an account?
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => navigate("/choose-type")}
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
    marginTop: "20px",
  },
  linkButton: {
    backgroundColor: "#B07207",
    color: "#FFFFFF",
    padding: "8px 20px",
    fontSize: "14px",
    borderRadius: "8px",
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

const CustomRadio = styled(Radio)(({ theme }) => ({
  color: "white",
  "&.Mui-checked": {
    color: "#B07207",
  },
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
