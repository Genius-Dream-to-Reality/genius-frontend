import React from "react";
export default function Checkbox({value, className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            value={value??1}
            className={
                "rounded border-gray-300 text-gray-900 shadow-sm focus:ring-gray-900 " +
                className
            }
        />
    );
}
