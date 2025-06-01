import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const Alert = ({ message, type, onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const alertColors = {
        success: {
            bg: 'bg-green-100',
            border: 'border-green-400',
            text: 'text-green-800',
            icon: <FiCheckCircle className="text-green-500" size={24} />
        },
        error: {
            bg: 'bg-red-100',
            border: 'border-red-400',
            text: 'text-red-800',
            icon: <FiAlertCircle className="text-red-500" size={24} />
        },
        warning: {
            bg: 'bg-yellow-100',
            border: 'border-yellow-400',
            text: 'text-yellow-800',
            icon: <FiAlertCircle className="text-yellow-500" size={24} />
        }
    };

    const { bg, border, text, icon } = alertColors[type] || alertColors.error;

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center p-4 rounded-lg shadow-lg ${bg} border-l-4 ${border} max-w-sm`}
        >
            <div className="mr-3">
                {icon}
            </div>
            <div className={`flex-1 ${text} font-medium`}>
                {message}
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-gray-500 hover:text-gray-700"
            >
                <FiX size={20} />
            </button>
        </motion.div>
    );
};

export default Alert;