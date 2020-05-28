import React from "react";
import PropTypes from "prop-types";
import Rating from "../../specialForms/Rating";

const RatingInput = ({ onChange, rating, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={"rating"} className="font-weight-bold">
        Rating
      </label>
      <div className="field">
        <Rating rating={rating} onChange={onChange} />
        {error && (
          <div role="alert" className="alert alert-danger">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

RatingInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
  error: PropTypes.string,
};

export default RatingInput;
