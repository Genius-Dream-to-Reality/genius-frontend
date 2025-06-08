import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginApi, scheduleTokenRefresh } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // // const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/me";
                // const res = await fetch(apiURL, {
                //     credentials: "include",
                // });
                //
                // if (res.ok) {
                //     const data = await res.json();
                //     setUser({
                //         username: data.username,
                //         email: data.email,
                //         userId: data.userId,
                //         userType: data.userType,
                //     });
                //
                    scheduleTokenRefresh();
                // }
            } catch (e) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async ({ email, password, type }) => {
        const result = await loginApi({ email, password, type });
        console.log("In side the login user context");

        if (result.type === "success") {
            const { username, email, userId, userType } = result.message;
            setUser({ username, email, userId, userType });

            scheduleTokenRefresh();
        }

        return result;
    };

    const logout = async () => {
        try {
            const apiURL = process.env.REACT_APP_AUTH_API_URL + "/auth/logout";
            await fetch(apiURL, {
                method: "POST",
                credentials: "include",
            });

            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
