import axios from "axios";

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
