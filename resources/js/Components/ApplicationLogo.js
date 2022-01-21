import React from "react";
import Logo from "/images/Logo.png";

export default function ApplicationLogo({ className }) {
    return <img src={Logo} alt="Logo" className={className} />;
}
