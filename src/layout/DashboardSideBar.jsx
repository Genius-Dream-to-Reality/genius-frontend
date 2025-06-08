import React from "react";
import { Grid } from "@mui/material";
import { Settings } from "@mui/icons-material";
import ProfileImageUploader from "../components/shared/ProfileImageUploader";


const Sidebar = ({ isAuthenticated, userInfo, onImageChange }) => {
    return (
        <Grid item xs={12} md={3}>
            <div className="flex flex-col items-center pt-16">
                <ProfileImageUploader
                    userId={userInfo?.id}
                    currentImageUrl={userInfo?.profilePicture}
                    onImageChange={onImageChange}
                />
                <h2 className="text-xl mt-4 font-medium text-white">
                    {isAuthenticated ? userInfo?.name : "Guest"}
                </h2>
                <div className="flex items-center mt-2 text-sm gap-1 text-gray-300 cursor-pointer hover:text-white">
                    <Settings fontSize="small" /> Setting
                </div>
            </div>
        </Grid>
    );
};

export default Sidebar;
