import React from "react";
import { PropTypes } from "prop-types";
import SelectInput from "../common/SelectInput";
import RatingInput from "../common/RatingInput";
import { Categories, Colors, Occasion } from "../../data/data";

const ClothesForm = ({
  clothing,
  onSave,
  errors = {},
  onChange,
  types,
  colors,
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="mb-4">Add New Piece of Clothing</h2>
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
        error={errors.category}
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
          />
        );
      })}

      {colors.length !== 0 ? (
        <SelectInput
          name="colors"
          label={clothing.colors.length === 0 ? "Color" : null}
          value={""}
          defaultOption={
            clothing.colors.length === 0 ? "Select Color" : "Add New Color"
          }
          options={colors.map((color) => ({
            value: color,
            text: color,
          }))}
          onChange={onChange}
          error={errors.colors}
        />
      ) : null}

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
        error={errors.occasion}
      />

      <RatingInput
        name="rating"
        label="Rating"
        onChange={onChange}
        rating={clothing.rating}
      />

      <button type="submit" className="btn btn btn-dark mt-3">
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
  colors: PropTypes.array.isRequired,
};

export default ClothesForm;
