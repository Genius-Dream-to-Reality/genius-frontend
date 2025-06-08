import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@mui/material";
import { Settings } from "@mui/icons-material";
import ProfileImageUploader from "../components/shared/ProfileImageUploader";
import UserProfileDialog from "../components/shared/UserProfileDialog";
import { getVendorDetails, getCustomerDetails } from "../api/auth";
import { useSelector } from "react-redux";
import { AlertContext } from "../contexts/AlertContext";
import { useContext } from "react";

const Sidebar = ({ isAuthenticated, onImageChange }) => {
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(state => state.auth);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user?.userId) return;

            try {
                setLoading(true);
                const fetchFunction = user.userType === 'VENDOR' ? getVendorDetails : getCustomerDetails;
                const result = await fetchFunction(user.userId);

                if (result.type === 'success') {
                    setUserDetails(result.data);
                } else {
                    addAlert('Failed to load user details', 'error');
                }
            } catch (error) {
                addAlert('Error loading user details', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user?.userId, user?.userType, addAlert]);

    const handleOpenProfileDialog = () => {
        setIsProfileDialogOpen(true);
    };

    const handleCloseProfileDialog = () => {
        setIsProfileDialogOpen(false);
    };

    const handleImageChange = async (file) => {
        if (onImageChange) {
            await onImageChange(file);
            // Refresh user details to get the updated profile picture
            const fetchFunction = user.userType === 'VENDOR' ? getVendorDetails : getCustomerDetails;
            const result = await fetchFunction(user.userId);
            if (result.type === 'success') {
                setUserDetails(result.data);
            }
        }
    };

    if (loading) {
        return (
            <Grid item xs={12} md={3}>
                <div className="flex flex-col items-center pt-16">
                    <CircularProgress sx={{ color: '#B07207' }} />
                </div>
            </Grid>
        );
    }

    return (
        <Grid item xs={12} md={3}>
            <div className="flex flex-col items-center pt-16">
                <ProfileImageUploader
                    currentImageUrl={userDetails?.profilePicture}
                    onImageChange={handleImageChange}
                />
                <h2 className="text-xl mt-4 font-medium text-white">
                    {isAuthenticated ? userDetails?.name || "Loading..." : "Guest"}
                </h2>
                <div 
                    className="flex items-center mt-2 text-sm gap-1 text-gray-300 cursor-pointer hover:text-white"
                    onClick={handleOpenProfileDialog}
                >
                    <Settings fontSize="small" /> Setting
                </div>
            </div>

            <UserProfileDialog 
                open={isProfileDialogOpen}
                onClose={handleCloseProfileDialog}
            />
        </Grid>
    );
};

export default Sidebar;
