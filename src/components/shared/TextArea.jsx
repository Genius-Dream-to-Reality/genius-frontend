import React from "react";

const TextArea = React.forwardRef(
    (
        {
            placeholder,
            rows,
            resize,
            className,
            styleVariant = "primary",
            ...props
        },
        ref
    ) => {
        const resizeStyle = resize ? `resize-${resize}` : "resize-none";

        const styleVariantClasses = {
            primary:
                "ring-gray-in placeholder:text-gray-placeholder placeholder:font-medium ring-1 ring-inset focus:ring-1 focus:ring-inset focus:ring-gray-800",
            bottomLined:
                "appearance-none outline-none border-b-2 border-gray-400 bg-transparent focus:bg-rose-100",
        };

        const styleVariantClass = styleVariant
            ? styleVariantClasses[styleVariant]
            : "";

        return (
            <textarea
                className={`block w-full ${className} ${styleVariantClass}  ${resizeStyle} border-0 text-gray-900 shadow-sm sm:text-sm sm:leading-6`}
                placeholder={placeholder}
                rows={rows}
                ref={ref}
                {...props}
            />
        );
    }
);

export default TextArea;
