import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadVendorProfilePicture, uploadCustomerProfilePicture } from "../../api/auth";
import { useSelector } from "react-redux";
import { AlertContext } from "../../contexts/AlertContext";
import { useContext } from "react";
import { compressImage } from "../../utils/imageCompression";
import { CircularProgress } from "@mui/material";

const ProfileImageUploader = ({ currentImageUrl, onImageChange }) => {
    const [localImage, setLocalImage] = useState(currentImageUrl || null);
    const [uploadError, setUploadError] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { user } = useSelector(state => state.auth);
    const { addAlert } = useContext(AlertContext);

    useEffect(() => {
        setLocalImage(currentImageUrl || null);
    }, [currentImageUrl]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setUploadError(null);

            // Compress the image before uploading
            const compressedFile = await compressImage(file);
            if (!compressedFile) {
                throw new Error("Failed to compress image");
            }

            // Choose the appropriate upload function based on user type
            const uploadFunction = user?.userType === 'VENDOR' 
                ? uploadVendorProfilePicture 
                : uploadCustomerProfilePicture;

            const result = await uploadFunction(user.userId, compressedFile);
            
            if (result.type === "success") {
                // Create a preview URL for immediate display
                const reader = new FileReader();
                reader.onloadend = () => {
                    setLocalImage(reader.result);
                };
                reader.readAsDataURL(compressedFile);

                if (onImageChange) onImageChange(compressedFile);
                addAlert("Profile picture updated successfully", "success");
            } else {
                setUploadError(result.message || "Upload failed");
                addAlert(result.message || "Failed to update profile picture", "error");
            }
        } catch (error) {
            const errorMessage = "Unexpected error during upload";
            setUploadError(errorMessage);
            addAlert(errorMessage, "error");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteImage = () => {
        setLocalImage(null);
        if (onImageChange) onImageChange(null);
        // Note: Backend API for image deletion not provided yet
    };

    return (
        <>
            <div className="relative group w-48 h-48 rounded-full border-8 border-[#403557] overflow-hidden cursor-pointer">
                <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUploading}
                />
                {isUploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <CircularProgress size={40} sx={{ color: '#B07207' }} />
                    </div>
                ) : localImage ? (
                    <img
                        src={localImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                ) : (
                    <label
                        htmlFor="upload-photo"
                        className="w-full h-full flex items-center justify-center bg-gray-700 text-white text-sm"
                    >
                        Upload Image
                    </label>
                )}
                {localImage && !isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-4">
                            <label
                                htmlFor="upload-photo"
                                className="flex items-center space-x-1 text-white hover:text-gray-200"
                            >
                                <EditIcon fontSize="small" />
                                <span className="text-sm">Edit</span>
                            </label>
                            <button
                                onClick={handleDeleteImage}
                                className="flex items-center space-x-1 text-white hover:text-red-400"
                            >
                                <DeleteIcon fontSize="small" />
                                <span className="text-sm">Delete</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {uploadError && (
                <div className="mt-2 text-red-500 text-sm text-center">
                    {uploadError}
                </div>
            )}
        </>
    );
};

export default ProfileImageUploader;
