import axios from 'axios';

const VENDOR_API_URL = process.env.REACT_APP_VENDOR_API_URL;

if (!VENDOR_API_URL) {
    console.error('REACT_APP_VENDOR_API_URL environment variable is not set!');
}

// Ensure all requests carry credentials by default
axios.defaults.withCredentials = true;

const handleApiError = (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return {
        type: "error",
        status: error.response?.status || 500,
        message: error.response?.data || "Something went wrong",
    };
};

// Helper function to attach credentials explicitly
const axiosGet = async (url) => axios.get(url, { withCredentials: true });
const axiosPost = async (url, data) => axios.post(url, data, { withCredentials: true });
const axiosDelete = async (url) => axios.delete(url, { withCredentials: true });

export const vendorApi = {
    getVendorServiceTypes: async () => {
        try {
            const response = await axiosGet(`${VENDOR_API_URL}/api/vendor-service-types`);
            //console.log("Vendor service types response:", response);
            return { 
                type: "success", 
                status: response.status, 
                data: response.data
            };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getVendorById: async (vendorId) => {
        try {
            const response = await axiosGet(`${VENDOR_API_URL}/api/vendor/${vendorId}`);
            return {
                type: 'success',
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching vendor:', error);
            return handleApiError(error)
        }
    },

    getVendorServices: async (vendorId) => {
        try {
            const response = await axiosGet(`${VENDOR_API_URL}/api/vendor/${vendorId}`);
            return {
                type: 'success',
                data: response.data
            };
        } catch (error) {
            console.error('Error fetching vendor services:', error);
            return handleApiError(error);
        }
    },

    createVendorService: async (serviceData, images) => {
        try {
            const formData = new FormData();

            // Add the vendor service data as a JSON string
            formData.append('vendorService', JSON.stringify(serviceData));

            // Add all the images
            if (images.serviceImages) {
                images.serviceImages.forEach(image => {
                    formData.append('images', image);
                });
            }

            if (images.identityImages) {
                formData.append('identityFront', images.identityImages.front);
                formData.append('identityBack', images.identityImages.back);
            }

            if (images.eSignature) {
                formData.append('eSignature', images.eSignature);
            }

            // Add package images
            if (images.basicImages) {
                images.basicImages.forEach(image => {
                    formData.append('basicImages', image);
                });
            }

            if (images.standardImages) {
                images.standardImages.forEach(image => {
                    formData.append('standardImages', image);
                });
            }

            if (images.premiumImages) {
                images.premiumImages.forEach(image => {
                    formData.append('premiumImages', image);
                });
            }

            const response = await axios.post(`${VENDOR_API_URL}/api/store`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            return {
                type: 'success',
                data: response.data
            };
        } catch (error) {
            return handleApiError(error);
        }
    },

    // Add other vendor-related API calls here
};

