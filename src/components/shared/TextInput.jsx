import React from "react";

const TextInput = React.forwardRef(
    (
        { className, size = "normal", styleVariant = "primary", ...props },
        ref
    ) => {
        const sizeClasses = {
            normal: "py-2 px-5",
            large: "py-3 px-6",
            medium: "py-2 px-5",
            small: "py-2 px-3",
            ex_small: "py-1.5 px-3 text-sm",
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
            <input
                {...props}
                ref={ref}
                className={`block w-full ${className} ${styleVariantClass} ${sizeClass} border-0 text-gray-900 shadow-sm sm:text-sm sm:leading-6`}
            />
        );
    }
);
export default TextInput;
