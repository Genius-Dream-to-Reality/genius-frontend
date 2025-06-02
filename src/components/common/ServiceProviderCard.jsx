import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Rating,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import serviceCardImage from "../../assets/images/ServiceCard.jpg";
import { AlertContext } from "../../contexts/AlertContext";

const buttonStyle = {
    color: "#FFFFFF",
    padding: "10px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    textTransform: "none",
    border: "2px solid #a0a5ee",
    marginTop: "20px",
};

const ServiceCard = ({ service, onAdd, onRemove, onClose, noOfParticipants, isAdded = false, onFinal= false}) => {
    const [selectedPackage, setSelectedPackage] = useState("BASIC");
    const [pkgPrice, setPkgPrice] = useState(null);
    const [applyingPackages, setApplyingPackages] = useState([]);
    const { addAlert } = useContext(AlertContext);

    const availablePackages = [
        { name: "BASIC", data: service?.basic },
        { name: "STANDARD", data: service?.standard },
        { name: "PREMIUM", data: service?.premium },
    ].filter(pkg => pkg.data);

    useEffect(() => {
        const filteredPackages = availablePackages.filter(pkg =>
            pkg.data.expectedParticipants >= noOfParticipants
        );

        setApplyingPackages(filteredPackages);

        if (filteredPackages.length > 0) {
            setSelectedPackage(filteredPackages[0].name);
        } else {
            setSelectedPackage(availablePackages[0]?.name || "BASIC");
        }
    }, [service, noOfParticipants]);

    const handlePackageChange = (event) => {
        const selectedPkgName = event.target.value;
        const selectedPkg = availablePackages.find(pkg => pkg.name === selectedPkgName);

        if (selectedPkg.data.expectedParticipants >= noOfParticipants) {
            setSelectedPackage(selectedPkgName);
            setPkgPrice(selectedPkg?.data?.price);
        } else {
            addAlert(`This package requires at least ${selectedPkg.data.expectedParticipants} participants`, "warning");
        }
    };

    const handleAddOrRemove = () => {
        if (isAdded) {
            onRemove(service.id);
        } else {
            onAdd({
                serviceId: service?.id,
                service: service,
                package: selectedPackage
            });

        }
    };

    return (
        <Card sx={{ display: 'flex', width: '100%', position: 'relative', marginBottom: 2 }}>
            {onClose && (
                <IconButton
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 10, right: 10, color: 'black' }}
                >
                    <CloseIcon />
                </IconButton>
            )}

            <CardMedia
                component="img"
                alt={service?.name || "Service"}
                height="200"
                image={service?.images?.[0] || serviceCardImage}
                sx={{ width: 200 }}
            />

            <CardContent sx={{ flex: 1, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6" color="black">
                        {service?.name || "Unknown Service"}
                    </Typography>
                    <Rating
                        name="read-only"
                        value={service?.rating || 4}
                        readOnly
                    />
                </Box>

                <Typography variant="body2" color="textSecondary" paragraph sx={{ marginTop: 2 }}>
                    {service?.description || "No description provided."}
                </Typography>

                <Typography variant="h6" color="black" sx={{ marginTop: 2 }}>
                    {pkgPrice !== null && pkgPrice}
                    {pkgPrice === null && !isAdded && availablePackages.length > 0 && `Starts from Rs. ${availablePackages[0].data.price}`}
                    {isAdded && `${availablePackages.find(pkg => pkg.name === service.selectedPackage)?.data?.price}`}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, marginTop: 2, alignItems: 'center' }}>
                    <FormControl fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel id="package-select-label">Package</InputLabel>
                        <Select
                            labelId="package-select-label"
                            value={isAdded ? service.selectedPackage : selectedPackage}
                            label="Package"
                            onChange={handlePackageChange}
                            sx={{ height: '40px', color: 'black' }}
                            disabled={isAdded}
                            defaultValue={selectedPackage}
                        >
                            {availablePackages.map((pkg) => (
                                <MenuItem
                                    key={pkg.name}
                                    value={pkg.name}
                                    disabled={pkg.data.expectedParticipants < noOfParticipants}
                                    sx={{ color: 'black' }}
                                >
                                    {pkg.name} - {pkg.data.expectedParticipants} Persons   {/* Display formatted text */}
                                    {pkg.data.expectedParticipants < noOfParticipants &&
                                        ` (Min ${pkg.data.expectedParticipants} participants)`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        sx={buttonStyle}
                        style={{
                            backgroundColor: isAdded ? "#d32f2f" : "#B07207",
                            width: "120px",
                            '&:hover': {
                                backgroundColor: isAdded ? "#b71c1c" : "#8a5a04",
                            }
                        }}
                        disabled={onFinal}
                        onClick={handleAddOrRemove}
                    >
                        {isAdded ? "REMOVE" : "ADD"}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                            {isAdded ? (
                                <path d="M19 13H5V11H19V13Z" fill="white" />
                            ) : (
                                <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="white" />
                            )}
                        </svg>
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.number,
        images: PropTypes.arrayOf(PropTypes.string),
        basic: PropTypes.object,
        standard: PropTypes.object,
        premium: PropTypes.object,
        selectedPackage: PropTypes.string,
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    noOfParticipants: PropTypes.number,
    isAdded: PropTypes.bool,
};

export default ServiceCard;