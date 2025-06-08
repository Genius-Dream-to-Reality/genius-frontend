import { login as loginApi, refreshToken as refreshTokenApi } from '../api/auth';
import axios from 'axios';
import { store } from '../redux/store';
import { setUser, setLoading, setError, logout } from '../redux/slices/authSlice';

// Configure axios defaults
axios.defaults.withCredentials = true;

let refreshTokenInterval;
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Add axios response interceptor for global 401/403 handling
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && (error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then(() => {
                    return axios(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const result = await refreshTokenApi();
                if (result.type === "success") {
                    store.dispatch(setUser(result.message));
                    processQueue(null, result.message);
                    return axios(originalRequest);
                } else {
                    processQueue(new Error('Failed to refresh token'));
                    store.dispatch(logout());
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                processQueue(refreshError);
                store.dispatch(logout());
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
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
                store.dispatch(setUser(result.message));
                authService.startTokenRefresh();
                // Store login timestamp
                localStorage.setItem('loginTimestamp', Date.now().toString());
            } else {
                store.dispatch(setError(result.message));
            }

            return result;
        } finally {
            store.dispatch(setLoading(false));
        }
    },

    logout: async () => {
        try {
            // Clear token refresh interval
            if (refreshTokenInterval) {
                clearInterval(refreshTokenInterval);
                refreshTokenInterval = null;
            }

            // Clear local storage items
            localStorage.removeItem('loginTimestamp');
            
            const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/logout";
            await axios.post(apiURL, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Dispatch logout action after successful API call
            store.dispatch(logout());

            return { type: 'success' };
        } catch (error) {
            console.error("Logout failed:", error.message);
            // Still clear the local state even if API call fails
            store.dispatch(logout());
            return { type: 'error', message: "Logout failed" };
        }
    },

    startTokenRefresh: () => {
        if (refreshTokenInterval) {
            clearInterval(refreshTokenInterval);
            refreshTokenInterval = null;
        }

        // Refresh token 5 minutes before expiry (assuming 45-minute token lifetime)
        const refreshTime = 40 * 60 * 1000; // 40 minutes
        refreshTokenInterval = setInterval(async () => {
            try {
                const result = await refreshTokenApi();
                if (result.type === "success") {
                    store.dispatch(setUser(result.message));
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
                store.dispatch(logout());
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }
        }, refreshTime);
    },

    // Initialize auth state
    initializeAuth: async () => {
        try {
            const state = store.getState();
            const loginTimestamp = localStorage.getItem('loginTimestamp');
            
            // If no user in state or no login timestamp, don't attempt refresh
            if (!state.auth.user || !loginTimestamp) {
                return;
            }

            // Check if token refresh is needed (if more than 30 minutes have passed)
            const timeSinceLogin = Date.now() - parseInt(loginTimestamp);
            if (timeSinceLogin > 30 * 60 * 1000) { // 30 minutes
                const result = await refreshTokenApi();
                if (result.type === "success") {
                    store.dispatch(setUser(result.message));
                    authService.startTokenRefresh();
                } else {
                    throw new Error('Token refresh failed');
                }
            } else {
                // If less than 30 minutes, just start the refresh timer
                authService.startTokenRefresh();
            }
        } catch (error) {
            console.error("Failed to initialize auth state:", error);
            store.dispatch(logout());
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    }
}; 