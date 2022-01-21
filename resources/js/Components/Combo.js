import React from "react";

export default function Button({
    name,
    options,
    handleChange,
    className,
    value,
    add,
}) {
    return (
        <select
            className={className}
            name={name}
            onChange={handleChange}
            value={value}
        >
            {/* {add && <option value="0"> {defaultValue}</option>} */}
            {options.map((option, index) => (
                <option key={index} value={index}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}
