import { login as loginApi, refreshToken as refreshTokenApi } from '../api/auth';
import axios from 'axios';
import { store } from '../redux/store';
import { setUser, setLoading, setError, logout } from '../redux/slices/authSlice';

let refreshTokenInterval;

// Add axios response interceptor for global 401/403 handling
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Clear auth state and intervals
            store.dispatch(logout());
            if (refreshTokenInterval) {
                clearInterval(refreshTokenInterval);
                refreshTokenInterval = null;
            }
            // Redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async ({ email, password, type }) => {
        try {
            store.dispatch(setLoading(true));
            const result = await loginApi({ email, password, type });

            if (result.type === "success") {
                // Store the user data directly from the response message
                store.dispatch(setUser(result.message));
                // Start token refresh cycle after 45 minutes
                authService.startTokenRefresh();
            } else {
                store.dispatch(setError(result.message));
            }

            return result;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    logout: () => {
        return new Promise(async (resolve, reject) => {
            try {
                // First dispatch logout action to clear Redux state
                store.dispatch(logout());
                
                // Stop token refresh
                if (refreshTokenInterval) {
                    clearInterval(refreshTokenInterval);
                    refreshTokenInterval = null;
                }

                // Then make the API call
                const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/logout";
                await axios.post(apiURL, {}, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                resolve();
            } catch (error) {
                console.error("Logout failed:", error.message);
                store.dispatch(setError("Logout failed"));
                reject(error);
            }
        });
    },

    startTokenRefresh: () => {
        // Clear any existing interval first
        if (refreshTokenInterval) {
            clearInterval(refreshTokenInterval);
            refreshTokenInterval = null;
        }

        // Set interval to refresh token every 45 minutes
        refreshTokenInterval = setInterval(async () => {
            try {
                const result = await refreshTokenApi();
                if (result.type === "error") {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
                // The axios interceptor will handle 401/403 responses
            }
        }, 45 * 60 * 1000); // 45 minutes
    },

    // Initialize auth state
    initializeAuth: async () => {
        try {
            const state = store.getState();
            if (!state.auth.user) {
                return;
            }

            // Try to refresh the token
            const result = await refreshTokenApi();
            if (result.type === "success") {
                // Start refresh cycle
                authService.startTokenRefresh();
            }
        } catch (error) {
            console.error("Failed to initialize auth state:", error);
            // The axios interceptor will handle 401/403 responses
        }
    }
}; 