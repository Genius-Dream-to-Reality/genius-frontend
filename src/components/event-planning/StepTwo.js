import React, { useState } from "react";
import {
    Grid,
    InputBase,
    IconButton,
    Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import DropDown from "../common/DropDown";
import useStyles from "../../assets/css/style";

const StepTwo = () => {
    const classes = useStyles();
    const [selectedService, setSelectedService] = useState("Select a Service");
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
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ marginBottom: "10px", padding: "30px 150px 0px 150px" }}
        >
            <Grid item xs={12} sm={3}>
                <DropDown
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
        </Grid>
    );
};

export default StepTwo;


