import React from "react";
import PropTypes from "prop-types";
import Rating from "../specialForms/Rating";

const RatingInput = ({ name, label, onChange, rating, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="font-weight-bold">
        {label}
      </label>
      <div className="field">
        <Rating rating={rating} onChange={onChange} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

RatingInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
};

export default RatingInput;
