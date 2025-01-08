import React, { useState } from "react";
import {
    Grid,
    InputBase,
    IconButton,
    Box,
    Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import DropDown from "../common/DropDown";
import useStyles from "../../assets/css/style";
import ServiceProvidersCard from "../common/ServiceProviderCard";

const StepTwo = () => {
    const classes = useStyles();
    const [selectedService, setSelectedService] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const eventServices = [
        "Decoration", "Music Teams", "Catering", "Photography",
        "Videography", "Lighting", "Sound System", "Venue Management",
        "Event Planning", "Security Services", "Transportation", "Invitation Cards",
        "Seating Arrangements", "Stage Setup", "Entertainment", "DJ Services",
        "Live Band", "Fireworks", "Florists", "Tableware",
    ];

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <Grid container direction="column" justifyContent="center" spacing={4} sx={{ padding: { xs: "30px 10px", sm: "30px 80px" } }}>
            {/* First Section: Dropdown and Search */}
            <Grid item xs={3} sm={3} justifyContent="center">
                <DropDown
                    label="Select the Service"
                    items={eventServices}
                    selectedItem={selectedService}
                    setSelectedItem={setSelectedService}
                />
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    padding="5px 0"
                    mt={2}

                >
                    <InputBase
                        className={classes.formInput}
                        placeholder="Search Vendors/Services"
                        value={searchValue}
                        onChange={handleSearchChange}

                    />
                    <IconButton style={{ color: "white" }}>
                        <Search />
                    </IconButton>
                </Box>
            </Grid>

            {/* Second Section: Service Providers Card */}
            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "rgba(175, 154, 13, 0.91)",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h6">The Closest Service Providers for You</Typography>
                    </Box>
                    <ServiceProvidersCard />
                    <ServiceProvidersCard />
                </Box>
            </Grid>

            {/* Third Section: Another Service Providers Card */}
            <Grid item xs={12}>
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "20px",
                        marginBottom: "20px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "rgba(175, 154, 13, 0.91)",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h6">The Closest Service Providers for You</Typography>
                    </Box>
                    <ServiceProvidersCard />
                    <ServiceProvidersCard />
                </Box>
            </Grid>
        </Grid>
    );
};

export default StepTwo;
