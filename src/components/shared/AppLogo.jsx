import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";


export default function AppLogo({ className, logoSize }) {
    const sizeClass = logoSize || "normal"; // Using custom height value directly
    return (
        <Link href={"/"} className={`${className || ""}`}>
            <img className={`${sizeClass} w-auto text-red`} src={logo} alt="" />{" "}
        </Link>
    );
}
