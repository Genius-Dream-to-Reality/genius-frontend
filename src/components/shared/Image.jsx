import React from "react";

export default function Image({ src, className, alt, ...props }) {
    return <img src={src} className={className} alt={alt} {...props} />;
}
