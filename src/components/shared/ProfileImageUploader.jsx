import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

const LOCAL_STORAGE_KEY = "userProfileImage";
const MAX_FILE_SIZE_MB = 5;
const MAX_BASE64_LENGTH = 6.5 * 1024 * 1024; // ~6.5MB base64 length

const ProfileImageUploader = ({ onImageChange }) => {
    const [localImage, setLocalImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const storedImage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedImage) {
            setLocalImage(storedImage);
        }
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > MAX_FILE_SIZE_MB) {
            setDialogOpen(true);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;

            if (base64Image.length > MAX_BASE64_LENGTH) {
                setDialogOpen(true);
                return;
            }

            setLocalImage(base64Image);
            localStorage.setItem(LOCAL_STORAGE_KEY, base64Image);
            if (onImageChange) onImageChange(file);
        };

        reader.readAsDataURL(file);
    };

    const handleDeleteImage = () => {
        setLocalImage(null);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
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

            {/* Dialog for oversized image */}
            <Dialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  PaperProps={{
    style: {
      backgroundColor: "#403557",
      color: "#ffffff",
      textAlign: "center",
      padding: "24px",
      borderRadius: "16px", 
      border: "15px solid #201439", 
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)", 
    },
  }}
>
  <DialogTitle style={{ fontWeight: "bold", fontSize: "1.4rem", marginBottom: "8px" }}>
    Image is too Large
  </DialogTitle>

  <DialogContent>
    <p style={{ fontSize: "1rem", margin: 0 }}>
      Please upload an image smaller than 5MB.
    </p>
  </DialogContent>

  <DialogActions style={{ justifyContent: "center", marginTop: "16px" }}>
    <Button
      onClick={() => setDialogOpen(false)}
      style={{
        color: "#ffffff",
        borderColor: "#ffffff",
        borderRadius: "8px",
        padding: "6px 24px",
        fontWeight: "bold",
      }}
      variant="outlined"
    >
      OK
    </Button>
  </DialogActions>
</Dialog>


        </>
    );
};

export default ProfileImageUploader;
