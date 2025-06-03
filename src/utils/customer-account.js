import axios from "axios";

// Function to upload customer profile picture
export async function uploadProfilePicture(userId, file) {
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("file", file);

    const apiURL = process.env.REACT_APP_AUTH_API_URL + "/customer/profile-picture";

    try {
        const response = await axios.post(apiURL, formData, {
            withCredentials: true,
        });
        console.log("Upload successful:", response.data);
        return {
            type: "success",
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Failed to upload profile picture",
        };
    }
}

//Function to get customer details
export async function getCustomerDetails(userId) {
    const apiURL = `${process.env.REACT_APP_AUTH_API_URL}/customer/${userId}`;
    
    try {
        const response = await axios.get(apiURL, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer details fetched successfully:", response.data);
        return {
            type: "success",
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        const statusCode = error.response?.status || 500;
        const errorMessage =
            error.response?.data?.message ||
            error.response?.data ||
            "An error occurred while fetching customer details.";

        console.error("Failed to fetch customer details:", errorMessage);
        return {
            type: "error",
            status: statusCode,
            message: errorMessage,
        };
    }
}


//Function to get event details of a customer
export async function getEventDataForCustomer(userId) {
    try {
        const apiURL = process.env.REACT_APP_EVENT_API_URL + "/event/get";

        const response = await axios.get(apiURL, {
            params: { user: userId },
            // withCredentials: true,
        });

        console.log("Event Data:", response.data);

        return {
            type: "success",
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Error fetching event data:", error.response?.data || error.message);

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}

// Function to delete an event by its ID
export async function deleteEventById(eventId) {
    try {
        const apiURL = `${process.env.REACT_APP_EVENT_API_URL}/delete/${eventId}`;

        const response = await axios.delete(apiURL);

        console.log("Event deleted:", response.data);

        return {
            type: "success",
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error("Error deleting event:", error.response?.data || error.message);

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}