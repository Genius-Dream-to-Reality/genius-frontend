import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";

const Payment = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Payment Data", data);
    navigate("/payment-processing");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3edfc",
        color: "black",
        "& .MuiTypography-root": { color: "black" },
        "& .MuiSvgIcon-root": { color: "black" },
        "& .MuiInputBase-input": { color: "black" },
        "& .MuiInputLabel-root": { color: "black" },
        "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
        display: "flex",
        flexDirection: "column",
        // Force Header button color to black
        "& header button": {
          color: "black !important",
        },

        // Icons inside header
        "& header button svg": {
          color: "black !important",
        },
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1, minHeight: isMobile ? "400px" : "500px", }}>
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: isMobile ? 3 : 5,
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={4}>
            {/* Left Side - Card Form */}
            <Grid item xs={12} md={6}>
              <Box display="flex" alignItems="center" mb={2}>
                <PaymentIcon sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Payment
                </Typography>
              </Box>

              <Typography variant="subtitle1" mb={2}>
                Enter card details
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  fullWidth
                  label="Card Name"
                  variant="outlined"
                  margin="normal"
                  {...register("cardName", { required: "Card Name is required" })}
                  error={!!errors.cardName}
                  helperText={errors.cardName?.message}
                />

                <TextField
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  margin="normal"
                  inputProps={{ maxLength: 19 }}
                  {...register("cardNumber", {
                    required: "Card Number is required",
                    pattern: {
                      value: /^[0-9\s]{16,19}$/,
                      message: "Invalid card number",
                    },
                  })}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CCV"
                      variant="outlined"
                      margin="normal"
                      inputProps={{ maxLength: 4 }}
                      {...register("ccv", {
                        required: "CCV is required",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "Invalid CCV",
                        },
                      })}
                      error={!!errors.ccv}
                      helperText={errors.ccv?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      variant="outlined"
                      margin="normal"
                      placeholder="MM / YY"
                      {...register("expiryDate", {
                        required: "Expiry Date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                          message: "Invalid expiry format",
                        },
                      })}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate?.message}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    backgroundColor: "#1c2452",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    py: 1.5,
                    "&:hover": {
                      backgroundColor: "#0f183c",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </Grid>

            {/* Right Side - Order Summary */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: 3,
                  background: "linear-gradient(to bottom, #e7e9f1, #d2d6e6)",
                  p: 3,
                  height: "100%",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Order Summary
                </Typography>

                <Box mb={2}>
                  <Grid container justifyContent="space-between" mb={1}>
                    <Typography>Wedding hall</Typography>
                    <Typography>Rs. 1000000</Typography>
                  </Grid>
                  <Grid container justifyContent="space-between" mb={1}>
                    <Typography>Photographer</Typography>
                    <Typography>Rs. 200000</Typography>
                  </Grid>
                  <Grid container justifyContent="space-between" mb={1}>
                    <Typography>Discount</Typography>
                    <Typography>5%</Typography>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Grid container justifyContent="space-between">
                    <Typography fontWeight="bold">Total</Typography>
                    <Typography fontWeight="bold" sx={{ color: "#1c2452" }}>
                      Rs. 1200000
                    </Typography>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Payment;
