import React from "react";
import { Link } from "react-router-dom";

const commonClasses =
    "inline-flex items-center justify-center shadow-md font-semibold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none focus:shadow-none active:opacity-[0.85] active:shadow-none focus:opacity-[0.85]";

const variantClasses = {
    primary: "bg-purple/10 hover:bg-primary-purple text-white focus:ring-primary-purple",
    primaryOutline: "text-black border bg-transparent focus:ring-red-700",
    dark: "bg-[#303030] hover:bg-[#303032] text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-600",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-700",
    light: "bg-white border border-gray-200 hover:bg-white hover:border-gray-300 focus:bg-white focus:border-gray-300",
};

const sizeClasses = {
    normal: "py-2 px-6 text-base",
    medium: "py-2 px-4 text-sm",
    small: "py-2 px-3 text-sm",
};

const Button = ({
    to,
    children,
    className,
    variant,
    size = "normal",
    ...props
}) => {
    const variantClass = variant ? variantClasses[variant] : "";
    const sizeClass = size ? sizeClasses[size] : "";

    return to ? (
        <Link
            href={to}
            className={`${variantClass} ${sizeClass} ${commonClasses} ${className}`}
            role="button"
            {...props}
        >
            {children}
        </Link>
    ) : (
        <button
            className={`${variantClass} ${sizeClass} ${commonClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
