import React from "react";
import Logo from "/Logo.png";

export default function ApplicationLogo({ className }) {
    return (
        <img
            src={Logo}
            width="180"
            height={40}
            alt="Logo"
            className={className}
        />
    );
}
