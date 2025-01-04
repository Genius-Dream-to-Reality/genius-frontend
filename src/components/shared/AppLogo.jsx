import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const AppLogo = ({ className, size = "normal" }) => {
  const sizeClasses = {
    sm: "h-6",
    normal: "h-8",
    lg: "h-36"
  };

  return (
    <Link to="/" className={`${className || ""}`}>
      <img 
        className={`${sizeClasses[size]} w-auto pt-8`} 
        src={logo}
        alt="Company Logo" 
      />
    </Link>
  );
};

export default AppLogo;