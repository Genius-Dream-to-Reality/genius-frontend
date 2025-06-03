import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadProfilePicture } from "../../utils/customer-account";

const ProfileImageUploader = ({ userId, currentImageUrl, onImageChange }) => {
    const [localImage, setLocalImage] = useState(currentImageUrl || null);
    const [uploadError, setUploadError] = useState(null);

    // Sync localImage with currentImageUrl on change
    useEffect(() => {
        setLocalImage(currentImageUrl || null);
    }, [currentImageUrl]);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const result = await uploadProfilePicture(userId, file);
            if (result.type === "success") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setLocalImage(reader.result);
                };
                reader.readAsDataURL(file);

                setUploadError(null);
                if (onImageChange) onImageChange(file);
            } else {
                setUploadError(result.message || "Upload failed");
            }
        } catch {
            setUploadError("Unexpected error during upload");
        }
    };

    const handleDeleteImage = () => {
        setLocalImage(null);
        // ToDo: call API to delete image from backend as well
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
                />
                {localImage ? (
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
                {localImage && (
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
        </>
    );
};

export default ProfileImageUploader;
