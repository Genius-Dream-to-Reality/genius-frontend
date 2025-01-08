import React from "react";
import { Grid, Typography, Box, Input, InputBase } from "@mui/material";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import useStyles from "../../assets/css/style";

const DetailInput = ({ label, value, icon }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            border: "2px solid white",
            borderRadius: "5px",
            color: "white",
            padding: "11px 20px"
        }}
    >
        <Input
            value={label ? `${label}: ${value}` : value}
            readOnly
            disableUnderline
            sx={{
                flex: 1,
                color: "white",
                fontSize: "14px",
            }}
        />
        {icon && <Box sx={{ marginLeft: "8px", color: "white" }}>{icon}</Box>}
    </Box>
);

const StepThree = ({ eventType, date, location, noOfParticipants, budgetRange }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={4} sx={{ marginBottom: 4 }}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ marginBottom: "35px" }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#cac9c9",
                        textAlign: "center",
                        lineHeight: 1.8,
                    }}
                >
                    Review below details before finalizing.
                    <br />
                    If you need anything to change, go BACK and alter them!
                </Typography>
                <Typography sx={{ fontSize: "30px", marginTop: 4 }}>
                    MY {eventType?.toUpperCase()}
                </Typography>
            </Grid>

            {/* Event Details Section */}
            <Grid container justifyContent="center" spacing={2} sx={{ padding: "30px 80px" }}>
                <Grid item xs={12} sm={3}>
                    <DetailInput label="Event Type" value={eventType} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={date} icon={<CalendarToday />} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={location} icon={<LocationOn />} />
                </Grid>
            </Grid>

            <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}
            >
                <Grid container item xs={12} alignItems="center" spacing={2}>
                    <Grid item xs={4} md={4}>
                        <Typography className={classes.typo}>Number of Participants:</Typography>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <InputBase
                            className={classes.formInput}
                            readOnly
                            value={noOfParticipants}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} alignItems="center" spacing={2}>
                    <Grid item xs={4} md={4}>
                        <Typography className={classes.typo}>Initial Budget Range:</Typography>
                    </Grid>
                    <Grid item xs={8} md={8}>
                        <InputBase
                            className={classes.formInput}
                            readOnly
                            value={`Rs. ${budgetRange}`}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

StepThree.defaultProps = {
    eventType: "Wedding",
    date: "2025.05.18",
    location: "Colombo, Sri Lanka",
    noOfParticipants: "50",
    budgetRange: "50,000 - 100,000",
};

export default StepThree;
