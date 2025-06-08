import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { ThemeProvider, Grid, Typography, Button, useTheme } from "@mui/material";
import Header from "../../layout/Header";

const EventPlanningCompletion = ({}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const { stepOneData,totalPrice, addedServices } = location.state || {};

    const handleReturn = () => {
        navigate("/customer-dashboard");
    };

    const handleViewEvent = () => {
        navigate("/view-plan");
    };

    const styles = {
        container: {
            textAlign: "center",
            paddingTop: "80px",
        },
        heading: {
            fontSize: "42px",
            marginBottom: "40px",
        },
        paragraph: {
            fontSize: "16px",
            color: "#cac9c9",
            marginBottom: "80px",
            lineHeight: "1.8",
        },
        button: {
            padding: "15px 30px",
            fontSize: "16px",
            borderRadius: "8px",
            width: "220px",
            textTransform: "none",
        },
        downloadButton: {
            backgroundColor: "#4C3A74",
            color: "#FFFFFF",
            border: "2px solid #a0a5ee",
        },
        viewButton: {
            backgroundColor: "#B07207",
            color: "#FFFFFF",
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Header />
                <Grid item xs={12} md={12} style={styles.container}>
                    <Typography style={styles.heading}>Congratulations!</Typography>
                    <Typography style={styles.paragraph}>
                        Your plan is finalized and selected vendors are notified.  
                        <br />
                        Wait 48 hours until we verify vendor availability and their acceptance.  
                        <br />
                        If a vendor declines your request,  
                        <br />
                        we will notify you immediately via email.
                    </Typography>

                    <Grid container justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                style={{ ...styles.button, ...styles.downloadButton }}
                                onClick={() => handleReturn()}
                            >
                                Dashboard
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                style={{ ...styles.button, ...styles.viewButton }}
                                onClick={() => handleViewEvent()}
                            >
                                View Plan
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default EventPlanningCompletion;
