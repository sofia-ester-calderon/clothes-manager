import React from "react";
import { PropTypes } from "prop-types";

import SelectInput from "../../common/inputs/select/SelectInput";
import RatingInput from "../../common/inputs/rating/RatingInput";
import MultiOptionsSelector from "./MultiOptionsSelector";

const ClothingForm = ({
  clothing,
  onSave,
  errors = {},
  onChange,
  types,
  colors,
  onRemoveColor,
  onChangeColor,
  options,
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="mb-4">
        {clothing.id ? "Edit" : "Add New Piece of"} Clothing
      </h2>

      {errors.onSave && (
        <div className="text-danger mb-4" role="alert">
          Error saving: {errors.onSave}
        </div>
      )}

      <SelectInput
        name="category"
        label="Category"
        value={clothing.category}
        defaultOption="Select Category"
        options={options.categories.map((category) => ({
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
          value: type.name,
          text: type.name,
        }))}
        onChange={onChange}
        error={errors.type}
        disabled={types.length === 0}
      />

      {clothing.colors.map((colorId, idx) => {
        return (
          <MultiOptionsSelector
            key={idx}
            label={idx === 0 ? "Color" : null}
            selectedValue={options.colors.find((color) => color.id === colorId)}
            onSelectionChanged={(e) => onChangeColor(e, colorId)}
            onSelectionDeleted={() => onRemoveColor(colorId)}
            clothingValues={clothing.colors}
            possibleOptions={options.colors}
            colorSelector={true}
          />
        );
      })}

      {colors.length > 0 && (
        <SelectInput
          name="colors"
          label={clothing.colors.length === 0 ? "Color" : null}
          value={""}
          defaultOption={
            clothing.colors.length === 0 ? "Select Color" : "Add New Color"
          }
          options={colors.map((color) => ({
            value: color.id,
            text: color.name,
          }))}
          onChange={onChange}
          error={errors.colors}
        />
      )}

      <SelectInput
        name="occasion"
        label="Occasion"
        value={clothing.occasion}
        defaultOption="Select Occasion"
        options={options.occasions.map((occasion) => ({
          value: occasion,
          text: occasion,
        }))}
        onChange={onChange}
        error={errors.occasion}
      />

      <SelectInput
        name="season"
        label="Season"
        value={clothing.season}
        defaultOption="Select Season"
        options={options.seasons.map((season) => ({
          value: season,
          text: season,
        }))}
        onChange={onChange}
        error={errors.season}
      />

      <RatingInput onChange={onChange} rating={clothing.rating} />

      <button type="submit" className="btn btn btn-dark mt-3">
        Save
      </button>
    </form>
  );
};

ClothingForm.propTypes = {
  clothing: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  types: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  onRemoveColor: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export default ClothingForm;
