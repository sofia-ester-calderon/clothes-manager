import React from "react";
import StarRatings from "react-star-ratings";
import { PropTypes } from "prop-types";

const Rating = ({ rating, onChange, size = "big" }) => {
  let starSize = "35px";
  let starSpacing = "7px";
  if (size === "small") {
    starSize = "25px";
    starSpacing = "1px";
  }
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#343a40"
      changeRating={onChange}
      numberOfStars={5}
      name="rating"
      starDimension={starSize}
      starSpacing={starSpacing}
      starHoverColor="#343a40"
    />
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

export default Rating;
