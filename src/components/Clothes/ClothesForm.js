import React from "react";
import { PropTypes } from "prop-types";
import SelectInput from "../common/SelectInput";
import RatingInput from "../common/RatingInput";
import { Categories, Colors, Occasion } from "../data/data";
import StarRatings from "react-star-ratings";

const ClothesForm = ({ clothing, onSave, errors = {}, onChange, types }) => {
  return (
    <form onSubmit={onSave}>
      <h2>Add New Piece of Clothing</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <SelectInput
        name="category"
        label="Category"
        value={clothing.category}
        defaultOption="Select Category"
        options={Categories.map((category) => ({
          value: category,
          text: category,
        }))}
        onChange={onChange}
        error={errors.clothing}
      />

      <SelectInput
        name="type"
        label="Type"
        value={clothing.type}
        defaultOption="Select Type"
        options={types.map((type) => ({
          value: type.id,
          text: type.name,
        }))}
        onChange={onChange}
        error={errors.type}
        disabled={types.length === 0}
      />

      {clothing.colors.map((color, idx) => {
        return (
          <SelectInput
            key={idx}
            name="colors"
            label={idx === 0 ? "Color" : null}
            value={color}
            defaultOption="Select Color"
            options={Colors.map((color) => ({
              value: color,
              text: color,
            }))}
            onChange={onChange}
            error={errors.colors}
          />
        );
      })}

      <SelectInput
        name="colors"
        label={clothing.colors.length === 0 ? "Color" : null}
        value={""}
        defaultOption={
          clothing.colors.length === 0 ? "Select Color" : "Add New Color"
        }
        options={Colors.map((color) => ({
          value: color,
          text: color,
        }))}
        onChange={onChange}
        error={errors.colors}
      />

      <SelectInput
        name="occasion"
        label="Occasion"
        value={clothing.occasion}
        defaultOption="Select Occasion"
        options={Occasion.map((occasion) => ({
          value: occasion,
          text: occasion,
        }))}
        onChange={onChange}
        error={errors.clothing}
      />

      <RatingInput
        name="rating"
        label="Rating"
        onChange={onChange}
        rating={clothing.rating}
      />

      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

ClothesForm.propTypes = {
  clothing: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  types: PropTypes.array.isRequired,
};

export default ClothesForm;
