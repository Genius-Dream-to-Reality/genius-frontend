import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Grid,
    CircularProgress,
    styled,
} from '@mui/material';
import { Close as CloseIcon, Email, Phone, LocationOn, Star, Business } from '@mui/icons-material';
import { getVendorDetails, getCustomerDetails } from '../../api/auth';
import { useSelector } from 'react-redux';
import { AlertContext } from '../../contexts/AlertContext';
import { useContext } from 'react';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        minWidth: '400px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
}));

const StyledDialogTitle = styled(DialogTitle)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const InfoRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    '& .MuiSvgIcon-root': {
        color: '#B07207',
    },
});

const UserProfileDialog = ({ open, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.userId || !open) return;

            setLoading(true);
            try {
                const fetchFunction = user.userType === 'VENDOR' ? getVendorDetails : getCustomerDetails;
                const result = await fetchFunction(user.userId);

                if (result.type === 'success') {
                    setUserData(result.data);
                } else {
                    addAlert('Failed to load user details', 'error');
                }
            } catch (error) {
                addAlert('Error loading user details', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, open, addAlert]);

    if (!open) return null;

    return (
        <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>
                Profile Details
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&:hover': { color: 'white' },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>
            <DialogContent sx={{ pt: 3 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress sx={{ color: '#B07207' }} />
                    </Box>
                ) : userData ? (
                    <Grid container spacing={3}>
                        <Grid item xs={12} display="flex" alignItems="center" gap={2} mb={2}>
                            <Box
                                component="img"
                                src={userData.profilePicture || 'https://via.placeholder.com/100'}
                                alt="Profile"
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    border: '4px solid #403557',
                                }}
                            />
                            <Box>
                                <Typography variant="h5" sx={{ color: '#fff', mb: 1 }}>
                                    {userData.name}
                                </Typography>
                                {user.userType === 'VENDOR' && userData.rating && (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Star sx={{ color: '#B07207' }} />
                                        <Typography variant="body1">
                                            {userData.rating.toFixed(1)} ({userData.reviews} reviews)
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <InfoRow>
                                <Email />
                                <Typography>{userData.email}</Typography>
                            </InfoRow>
                            <InfoRow>
                                <Phone />
                                <Typography>{user.userType === 'VENDOR' ? userData.phoneNumber : userData.mobileNo}</Typography>
                            </InfoRow>

                            {user.userType === 'VENDOR' && (
                                <>
                                    <InfoRow>
                                        <LocationOn />
                                        <Typography>
                                            {[userData.address, userData.city, userData.state, userData.zipCode]
                                                .filter(Boolean)
                                                .join(', ')}
                                        </Typography>
                                    </InfoRow>
                                    {userData.services && userData.services.length > 0 && (
                                        <InfoRow>
                                            <Business />
                                            <Typography>
                                                {userData.services.length} Active Services
                                            </Typography>
                                        </InfoRow>
                                    )}
                                </>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography color="error" textAlign="center">
                        Failed to load user details
                    </Typography>
                )}
            </DialogContent>
        </StyledDialog>
    );
};

export default UserProfileDialog; 