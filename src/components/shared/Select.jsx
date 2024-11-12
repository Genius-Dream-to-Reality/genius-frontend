import React from "react";

export default function Select({
    children,
    className,
    variant,
    styleVariant = "primary",
    size = "normal",
    ...props
}) {
    const sizeClasses = {
        large: "py-4 pl-6 pr-12",
        normal: "py-2 pl-5 pr-10",
        medium: "py-2 pl-3 pr-8",
        small: "py-1.5 pl-3 pr-8",
        exSmall: "py-0.5 pl-3 pr-8",
    };

    const styleVariantClasses = {
        primary:
            "ring-gray-in placeholder:text-gray-placeholder placeholder:font-medium ring-1 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-800",
        bottomLined:
            "appearance-none outline-none border-b-2 border-gray-400 bg-transparent focus:bg-rose-100",
    };

    const styleVariantClass = styleVariant
        ? styleVariantClasses[styleVariant]
        : "";
    const sizeClass = size ? sizeClasses[size] : "";
    return (
        <div className="relative">
            <select
                {...props}
                className={`${className} ${styleVariantClass} ${sizeClass} appearance-none block w-full border-0 text-gray-900 shadow-sm sm:text-sm sm:leading-6`}
            >
                {children}
            </select>
        </div>
    );
}

export function OvelSelect({ children, className, size = "normal", ...props }) {
    const sizeClasses = {
        normal: "py-1 pl-5 pr-10",
        large: "py-4 pl-6 pr-12",
    };
    const sizeClass = size ? sizeClasses[size] : "";
    return (
        <div className="relative">
            <select
                {...props}
                className={`${className} ${sizeClass} appearance-none block w-full rounded-full border-none text-gray-900 ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 `}
            >
                {children}
            </select>
        </div>
    );
}
