import React from "react";
import { Grid, Typography, Box, InputBase, FormControlLabel, Checkbox } from "@mui/material";
import { LocationOn, CalendarToday } from "@mui/icons-material";
import useStyles from "../../assets/css/style";
import ServiceCard from "../common/ServiceProviderCard";
import {formatTimestampToDateTime} from "../../utils/dateFormatter";

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
        <InputBase
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

const StepThree = ({ stepOneData, addedServices, totalBudget }) => {
    const classes = useStyles();

    return (
        <>
            {/* Title Section */}
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: "35px", padding: { xs: "30px 10px", sm: "30px 80px" } }}
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
                    {stepOneData?.eventName?.toUpperCase()}
                </Typography>
            </Grid>

            {/* Event Details Section */}
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12} sm={3}>
                    <DetailInput label="Event Type" value={stepOneData?.selectedEventType} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={stepOneData.eventDate} icon={<CalendarToday />} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={stepOneData.startTime} icon={<CalendarToday />} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={stepOneData.endTime} icon={<CalendarToday />} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <DetailInput value={stepOneData?.selectedDistrict} icon={<LocationOn />} />
                </Grid>
            </Grid>

            {/* Additional Information Section */}
            <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}
            >
                <Grid item xs={12} md={9}>
                    {[{
                        label: "Number of Participants:",
                        value: stepOneData?.numberOfParticipants
                    }, {
                        label: "Initial Budget Limit:",
                        value: `Rs. ${stepOneData?.budgetRange}`
                    }, {
                        label: "Current Package Price:",
                        value: `Rs. ${totalBudget}`
                    }
                    ].map((field, index) => (
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            key={index}
                            sx={{ marginTop: index !== 0 ? "5px" : 0 }}
                        >
                            <Grid item xs={4}>
                                <Typography className={classes.typo}>{field.label}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <InputBase
                                    className={classes.formInput}
                                    value={field.value}
                                    readOnly
                                />
                            </Grid>
                        </Grid>
                    ))}


                </Grid>


                <Grid item xs={12}>
                    <Box sx={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
                        <Box
                            sx={{
                                backgroundColor: "rgba(96, 84, 3, 0.91)",
                                color: "#fff",
                                padding: "10px",
                                borderRadius: "8px",
                                textAlign: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Typography variant="h6">Your Added Services</Typography>
                        </Box>
                        {addedServices?.length > 0 ? (
                            addedServices.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    service={service}
                                    onAdd={() => {}}
                                    isAdded={true}
                                    onFinal={true}
                                />
                            ))
                        ) : (
                            <Typography align="center">No service providers added yet.</Typography>
                        )}
                    </Box>
                </Grid>

            </Grid>



            <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}
            >
                <Grid item xs={12} md={8}>
                    <FormControlLabel
                        control={<Checkbox sx={{ color: "#fff" }} />}
                        label="Do you agree to our terms and conditions?"
                        sx={{ color: "#fff" }}
                    />
                </Grid>
            </Grid>
        </>
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
