import React from "react";

const Typography = ({ variant, className, children }) => {
    let Component = "p";

    switch (variant) {
        case "h1":
            Component = "h1";
            break;
        case "h2":
            Component = "h2";
            break;
        case "h3":
            Component = "h3";
            break;
        case "h4":
            Component = "h4";
            break;
        case "h5":
            Component = "h5";
            break;
        case "h6":
            Component = "h6";
            break;
        default:
            break;
    }

    let classes = "text-base";

    switch (variant) {
        case "display-5":
            classes =
                "lg:text-6xl sm:text-4xl text-3xl title-text font-extrabold";
            break;
        case "h1":
            classes =
                "lg:text-5xl md:text-4xl text-3xl title-text font-extrabold";
            break;
        case "h2":
            classes =
                "lg:text-4xl md:text-3xl sm:text-2xl text-lg title-text font-extrabold";
            break;
        case "h3":
            classes = "text-3xl font-extrabold";
            break;
        case "h4":
            classes = "lg:text-2xl sm:text-2xl text-lg font-extrabold";
            break;
        case "h5":
            classes = "text-xl font-extrabold";
            break;
        case "large":
            classes = "text-[#222222] lg:text-2xl md:text-xl";
            break;
        case "hero":
            classes = "text-[#222222] lg:text-2xl md:text-lg";
            break;
        case "medium":
            classes = "md:text-lg text-md font-medium";
            break;
        case "base-text":
            classes = "md:text-lg text-base";
            break;
        default:
            break;
    }

    const combinedClasses = `${classes} ${className || ""}`.trim();

    return <Component className={combinedClasses}>{children}</Component>;
};

export default Typography;
