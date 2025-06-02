import axios from "axios";

axios.defaults.withCredentials = true;

const handleApiError = (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return {
        type: "error",
        status: error.response?.status || 500,
        message: error.response?.data || "Something went wrong",
    };
};

export const eventCategoryApi = {
    getAllCategories: async () => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + "/event-categories/all";
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getCategoryById: async (id) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event-categories/get/${id}`;
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },
    
};

export const eventTypeApi = {
    getAllEventTypes: async () => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + "/event-types/all";
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getEventTypeById: async (id) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event-types/get/${id}`;
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getEventTypesByCategory: async (category) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event-types/get?category=${category}`;
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    }
};

// Event APIs
export const eventApi = {
    getEventById: async (id) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event/get/${id}`;
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getEventsByUserId: async (userId) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event/get?user=${userId}`;
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    createEvent: async (eventData) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + "/event/store";
            const response = await axios.post(apiURL, eventData);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event/update/${id}`;
            const response = await axios.post(apiURL, eventData);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    updateEventStatus: async (id, status) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event/update/status/${id}`;
            const response = await axios.post(apiURL, { status });
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    deleteEvent: async (id) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + `/event/delete/${id}`;
            const response = await axios.delete(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },
};

// Vendor Service APIs
export const vendorServiceApi = {
    getAvailableServices: async (availabilityCheckRequest) => {
        try {
            const apiURL = process.env.REACT_APP_EVENT_API_URL + "/service/available";
            const response = await axios.post(apiURL, availabilityCheckRequest);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    },

    getVendorServiceTypes: async () =>{
        try {
            const apiURL = process.env.REACT_APP_VENDOR_API_URL + "/api/vendor-service-types";
            const response = await axios.get(apiURL);
            return { type: "success", status: response.status, data: response.data };
        } catch (error) {
            return handleApiError(error);
        }
    }
};

// Combined API object for easier imports
export const api = {
    eventCategory: eventCategoryApi,
    eventType: eventTypeApi,
    event: eventApi,
    vendorService: vendorServiceApi,
};