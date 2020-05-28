import React from "react";
import StarRatings from "react-star-ratings";
import { PropTypes } from "prop-types";

const Rating = ({ rating, onChange }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#343a40"
      changeRating={onChange}
      numberOfStars={5}
      name="rating"
      starDimension="35px"
      starHoverColor="#343a40"
    />
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Rating;
