import React, { useState } from "react";
import PropTypes from "prop-types";

const StyledInput = ({ id, type, onChange, initialValue }) => {
    const [value, setValue] = useState(initialValue);

    return (
        <input
            id={id}
            className="forms--input"
            value={value}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            type={type}
        />
    );
};

StyledInput.propTypes = {
    type: PropTypes.oneOf(["text", "number", "email", "password"]).isRequired,
    onChange: PropTypes.func.isRequired,
    initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    minLength: PropTypes.string,
    maxLength: PropTypes.string,
    required: PropTypes.bool,
};

export default StyledInput;
