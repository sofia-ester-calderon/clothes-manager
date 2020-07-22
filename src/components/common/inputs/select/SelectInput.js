import React from "react";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
  disabled = false,
}) => {
  return (
    <div className="form-group">
      {label ? (
        <label className="font-weight-bold" htmlFor={name}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <div className="field">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          disabled={disabled}
        >
          {defaultOption ? <option value="">{defaultOption}</option> : null}
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && (
          <div role="alert" className="text-danger">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
};

export default SelectInput;
