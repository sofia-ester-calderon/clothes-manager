import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label className="font-weight-bold" htmlFor={name}>
        {label}
      </label>

      <div className="field">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
        />
        {error && (
          <div role="alert" className="text-danger">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
};

export default TextInput;
