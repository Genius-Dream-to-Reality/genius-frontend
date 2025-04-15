import axios from "axios";

export async function customerRegistration(customerRegistrationData) {
    try {
        const apiURL = process.env.REACT_APP_AUTH_API_URL + "/customers/register";

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

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}

export async function vendorRegistration(vendorRegistrationData) {
    try {
        const apiURL = process.env.REACT_APP_AUTH_API_URL + "/vendors/register";

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

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}

export async function otpVerification(data, type) {
    try {
        let apiURL;
        if(type === "vendor"){
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/vendors/otp";
        }
        if(type === "customer"){
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/customers/otp";
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

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}

export async function otpRequest(email, type) {
    try {
        let apiURL;
        if(type === "vendor"){
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/vendors/otp";
        }
        if(type === "customer"){
            apiURL = process.env.REACT_APP_AUTH_API_URL + "/customers/otp";
        }

        const response = await axios.get(apiURL+`?email=${email}`);

        console.log("Otp Data", response);

        return {
            type: "success",
            status: response.status,
            message: response.data,
        };
    } catch (error) {
        console.error("Error in vendor otp Request:", error.response?.data || error.message);

        return {
            type: "error",
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong",
        };
    }
}
