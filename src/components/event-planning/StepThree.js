import React from "react";
import { Grid, Typography, Box, Input, InputBase } from "@mui/material";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import useStyles from "../../assets/css/style";

const StepThree = () => {
    const classes = useStyles();

    //These Values should come fromprops
    const eventType = "Wedding";
    const date = "2025.05.18";
    const location = "Colombo, Sri Lanka";
    const noOfParticipants = "50";

    return (
        <Grid
            container
            style={{ marginBottom: "10px", padding: "30px 150px 0px 150px" }}
        >
            <Grid container justifyContent="center" alignItems="center"
                style={{ marginBottom: "20px" }}
            >
                <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center"
                >
                    <Typography align="center" className={classes.typo}>
                        Review below details before finalize. <br />
                        If you need anything to change, go BACK and alter them!
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} container justifyContent="center" alignItems="center">
                    <Typography align="center">
                        <span>MY WEDDING</span>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" spacing={2} style={{ marginTop: "20px" }}>
                <Grid item xs={12} sm={3}>
                    <Box className={classes.BoxButton} >
                        <Input
                            value={"Event Type : " + eventType}
                            readOnly
                            disableUnderline
                            sx={{
                                flex: 1,
                                color: "white",
                                fontSize: "14px",
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box className={classes.BoxButton} >
                        <Input
                            value={date}
                            readOnly
                            disableUnderline
                            sx={{
                                flex: 1,
                                color: "white",
                                fontSize: "14px",
                            }}
                        />
                        <CalendarToday sx={{ color: "white", marginLeft: "8px" }} />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Box className={classes.BoxButton} >
                        <Input
                            value={location}
                            readOnly
                            disableUnderline
                            sx={{
                                flex: 1,
                                color: "white",
                                fontSize: "14px",
                            }}
                        />
                        <LocationOn sx={{ color: "white", marginLeft: "8px" }} />
                    </Box>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" spacing={2} 
                style={{ marginTop: "20px", padding: "40px 300px" }}
            >
                <Grid item xs={12} md={4}>
                    <Typography className={classes.typo}>
                        Number of Participants :
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <InputBase
                        className={classes.formInput}
                        readOnly
                        value={noOfParticipants}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography className={classes.typo}>
                        Initial Budget Range :
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <InputBase
                        className={classes.formInput}
                        readOnly
                        value={"Rs. " + noOfParticipants}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StepThree;
