import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

export async function customerRegistration(customerRegistrationData) {
    try {
        const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/customer/register";

        const response = await axios.post(apiURL, customerRegistrationData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Customer Data", response.data);

        return {
            type: "success",
            status: response.status,
            message: response.data,
        };
    } catch (error) {
        console.error("Error in customer registration:", error.response?.data || error.message);

        return handleAuthError(error)
    }
}

export async function vendorRegistration(vendorRegistrationData) {
    try {
        const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/vendor/register";

        const response = await axios.post(apiURL, vendorRegistrationData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Vendor Data", response.data);

        return {
            type: "success",
            status: response.status,
            message: response.data,
        };
    } catch (error) {
        console.error("Error in vendor registration:", error.response?.data || error.message);

        return handleAuthError(error)
    }
}

export async function otpVerification(data, type) {
    try {
        let apiURL;
        if (type === "vendor") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/vendor/otp";
        }
        if (type === "customer") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/customer/otp";
        }


        const response = await axios.post(apiURL, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Vendor Data", response.data);

        return {
            type: "success",
            status: response.status,
            message: response.data,
        };
    } catch (error) {
        console.error("Error in vendor otp verification:", error.response?.data || error.message);

        return handleAuthError(error)
    }
}

export async function otpRequest(email, type) {
    try {
        let apiURL;
        if (type === "vendor") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/vendor/otp";
        }
        if (type === "customer") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/customer/otp";
        }

        const response = await axios.get(apiURL + `?email=${email}`);

        console.log("Otp Data", response);

        return {
            type: "success",
            status: response.status,
            message: response.data,
        };
    } catch (error) {
        console.error("Error in vendor otp Request:", error.response?.data || error.message);

        return handleAuthError(error);
    }
}

export async function login({ email, password, type }) {
    try {
        let apiURL;
        if (type === "Event Planner") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/customer/login";
        } else if (type === "Vendor") {
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/vendor/login";
        } else {
            throw new Error("Invalid login type");
        }

        const response = await axios.post(apiURL, { email, password });
        return { type: "success", status: response.status, message: response.data };
    } catch (error) {
        return handleAuthError(error);
    }
}

export async function refreshToken() {
    try {
        const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/refresh-token";
        
        // The refresh token is automatically sent in cookies by axios
        const response = await axios.post(apiURL, {}, {
            withCredentials: true
        });
        return { 
            type: "success", 
            status: response.status, 
            message: response.data 
        };
    } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message);
        return handleAuthError(error);
    }
}

function handleAuthError(error) {
    console.error("Auth Error:", error.response?.data || error.message);
    return {
        type: "error",
        status: error.response?.status || 500,
        message: error.response?.data || "Something went wrong",
    };
}


