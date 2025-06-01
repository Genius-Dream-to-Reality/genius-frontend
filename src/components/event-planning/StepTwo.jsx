import React, {useContext, useState,useEffect} from "react";
import {
    Grid,
    InputBase,
    IconButton,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import DropDown from "../common/DropDown";
import useStyles from "../../assets/css/style";
import ServiceCard from "../common/ServiceProviderCard";
import { AlertContext } from "../../contexts/AlertContext";
import {vendorServiceApi} from "../../api/event";
import { generateDateTimeStrings } from "../../utils/dateFormatter";


const StepTwo = ({stepOneData, setAddedServices, addedServices, setCurrentPrice, currentPrice}) => {
    const classes = useStyles();
    const [selectedService, setSelectedService] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [addedServiceProviders, setAddedServiceProviders] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addAlert } = useContext(AlertContext);
    const [eventServices, setEventServices] = useState([]);


    useEffect( () => {
        const fetchVendorServiceTypes = async () =>{
            try{
                const response = await vendorServiceApi.getVendorServiceTypes();
                console.log(response);

                if (response.type === "success") {
                    let services = response.data.map(type => type.name);
                    if (stepOneData.hasLocation && stepOneData.eventLocation !== "") {
                        const excludedServices = ["Event Hall", "Hotel", "Outdoor Venue", "Restaurant"];
                        services = services.filter(service => !excludedServices.includes(service));
                        console.log("Filtered Services:", services);
                    }
                    setEventServices(services);
                }else{
                    addAlert("Sorry! Server Error", "error");
                    console.log(response.message);
                }

            }catch (err){
                console.error("Error fetching services:", err);
            }
        };
        fetchVendorServiceTypes()
        },[]);



    useEffect(() => {
        const fetchAvailableServices = async () => {
            if (!selectedService || !stepOneData) return;

            try {
                setLoading(true);
                setError(null);
                setAvailableServices([]);
                console.log(stepOneData)
                const formattedStartDateTime = generateDateTimeStrings(stepOneData.eventDate, stepOneData.startTime);
                const formattedEndDateTime = generateDateTimeStrings(stepOneData.eventDate, stepOneData.endTime);
                let dataToBesend = {
                    startDateTime: formattedStartDateTime,
                    endDateTime: formattedEndDateTime,
                    serviceType: selectedService,
                    district: stepOneData.selectedDistrict,
                    eventType: stepOneData.selectedEventType
                }
                console.log(dataToBesend);

                const response = await vendorServiceApi.getAvailableServices(dataToBesend)
                console.log(response);

                if (response.type === "success") {
                    const filteredServices = response.data.filter(service =>
                        !addedServices.some(added => added.id === service.id)
                    );
                    setAvailableServices(filteredServices);
                    console.log("available service: ", availableServices);
                } else if((await response).status === 404) {
                    addAlert(`We are sorry!, No ${selectedService} service available for ${stepOneData.selectedEventType} for the given time period`,"warning")

                }else{
                    addAlert(response.message, "error");
                }

            } catch (err) {
                setError(err.message || "Failed to fetch available services");
                if(err.status === 404){
                    addAlert(`We are sorry!, No ${selectedService} service available for ${stepOneData.selectedEventType} for the given time period`,"warning")
                }else {
                    addAlert(error, "error")
                }
                console.error("Error fetching services:", err);
            } finally {
                setLoading(false);
            }
        };

        // Add debounce to prevent rapid API calls
        const timer = setTimeout(() => {
            fetchAvailableServices();
        }, 500);

        return () => clearTimeout(timer);
    }, [selectedService, stepOneData]);


    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };



    const filteredServices = !searchValue
        ? availableServices
        : availableServices?.filter(service =>
            service.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            service.description.toLowerCase().includes(searchValue.toLowerCase())
        );



    const handleAddServiceProvider = (serviceData) => {
        if (addedServices.some(s => s.id === serviceData.serviceId)) {
            return;
        }
        const packageType = serviceData.package?.toLowerCase();
        const selectedPackage = serviceData.service[packageType];

        if(stepOneData.budgetLimited){
            if((currentPrice+selectedPackage.price)>stepOneData.budgetRange){
                addAlert(" Cannot add! You are trying to surpass the budget limit.","warning");
                return;
            }
        }
        setAddedServices(prev => [
            ...prev,
            {
                ...serviceData.service,
                selectedPackage: serviceData.package
            }
        ]);

        setAvailableServices(prev => prev?.filter(service => service.id !== serviceData.serviceId));
        setCurrentPrice(prevPrice => prevPrice + selectedPackage.price);
        addAlert("Successfully Added!","success")
    };

    const handleRemoveServiceProvider = (serviceId) => {
        let service = addedServices.find(service => service.id === serviceId);
        const packageType = service.selectedPackage?.toLowerCase();
        const selectedPackage = service[packageType]
        setAddedServices(prev => prev.filter(service => service.id !== serviceId));
        setAvailableServices(prev => [...prev, service ])
        setCurrentPrice(prevPrice => prevPrice - selectedPackage.price);

        addAlert("Successfully Remove!","error")
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
                        <Typography variant="h6">The Closest Service Providers for You</Typography>
                    </Box>

                    {loading ? (
                        <Box display="flex" justifyContent="center" p={4}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error" align="center">{error}</Typography>
                    ) : filteredServices?.length > 0 ? (
                        filteredServices.map((service, index) => (
                            <ServiceCard
                                key={index}
                                service={service}
                                onAdd={handleAddServiceProvider}
                                noOfParticipants= {Number(stepOneData.numberOfParticipants)}
                                isAdded={addedServices.some(s => s.serviceId === service.id)}
                            />
                        ))
                    ) : (
                        <Typography align="center">
                            {selectedService ? "No service providers available" : "Please select a service type"}
                        </Typography>
                    )}
                </Box>
            </Grid>

            {/* Third Section: Added Service Providers */}
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
                        <Typography variant="h6">
                            <span style={{ fontWeight: 'bold' }}>Your Added Service Providers</span>
                            &nbsp;|&nbsp;
                            <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Total Price: Rs. {currentPrice.toFixed(2)}</span>
                        </Typography>

                    </Box>
                    {addedServices?.length > 0 ? (
                        addedServices.map((service, index) => (
                            <ServiceCard
                                key={index}
                                service={service}
                                onAdd={() => {}}
                                isAdded={true}
                                onRemove={handleRemoveServiceProvider}
                            />
                        ))
                    ) : (
                        <Typography align="center">No service providers added yet.</Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default StepTwo;
