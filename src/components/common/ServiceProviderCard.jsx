import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
import { Box, Card, CardContent, CardMedia, Button, Typography, Rating, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import serviceCard from "../../assets/images/ServiceCard.jpg";

// Button Style
const buttonStyle = {
    color: "#FFFFFF",
    padding: "10px 30px",
    fontSize: "16px",
    borderRadius: "8px",
    width: "200px",
    textTransform: "none",
    border: "2px solid #a0a5ee",
    marginTop: "20px",
};

const ServiceCard = ({ onClose, onAdd }) => {
    const handleAddClick = () => {
        //todo
        console.log("Need to develop!!!")
    };

    return (
        <Card sx={{ display: 'flex', width: '100%', position: 'relative' }}>
            <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', top: 10, right: 10, color: 'black' }}
            >
                <CloseIcon />
            </IconButton>
            <CardMedia
                component="img"
                alt="service provider"
                height="200"
                image={serviceCard}
                sx={{ width: 200 }}
            />
            <CardContent sx={{ flex: 1, textAlign: 'left' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="h6" color="black" component="div">
                        Elegant Wedding Hall
                    </Typography>
                    <Rating name="read-only" value={4} readOnly />
                </Box>
                <Typography variant="body2" color="textSecondary" paragraph sx={{ marginTop: 2 }}>
                    An elegant venue for your dream wedding. This spacious hall offers a charming atmosphere.
                </Typography>
                <Typography variant="h6" color="black" sx={{ marginTop: 2 }}>
                    Rs. $1,500
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <Button sx={buttonStyle} style={{ backgroundColor: "#4C3A74", display: 'flex', alignItems: 'center' }}>
                    Premiums
                    <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ marginLeft: '10px' }}>
                        <path d="M17 16L15.5019 14.59L9.5625 20.17V0H7.4375V20.17L1.50875 14.58L0 16L8.5 24L17 16Z" fill="white" />
                    </svg>
                </Button>

                <Button sx={buttonStyle} style={{ backgroundColor: "#B07207", width: "120px", display: 'flex', alignItems: 'center' }}>
                    ADD
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ marginLeft: '8px' }}>
                        <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="white" />
                    </svg>
                </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

ServiceCard.propTypes = {
    onClose: PropTypes.func.isRequired, 
};

const FullWidthWeddingHallCard = () => {
    const [showCard, setShowCard] = useState(true);

    const handleCloseCard = () => {
        setShowCard(false);
    };

    return (
        <Box
            sx={{
                backgroundColor: "rgba(175, 154, 13, 0.91)",
                color: "#fff",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                marginBottom: "20px",
                width: '100%',
                display: showCard ? 'block' : 'none', 
            }}
        >
            {showCard && <ServiceCard onClose={handleCloseCard} />}
        </Box>
    );
};

export default FullWidthWeddingHallCard;
