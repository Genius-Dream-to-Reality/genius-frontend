import React, { createContext, useState } from 'react';
import Alert from '../components/common/Alert';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    const addAlert = (message, type = 'success') => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeAlert(id);
        }, 5000);
    };

    const removeAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
            <div className="fixed bottom-0 right-0 z-50 space-y-2 p-4">
                {alerts.map((alert) => (
                    <Alert
                        key={alert.id}
                        message={alert.message}
                        type={alert.type}
                        onClose={() => removeAlert(alert.id)}
                    />
                ))}
            </div>
        </AlertContext.Provider>
    );
};