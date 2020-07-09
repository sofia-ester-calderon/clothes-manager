import React from "react";
import { PropTypes } from "prop-types";

import SelectInput from "../../common/inputs/select/SelectInput";
import RatingInput from "../../common/inputs/rating/RatingInput";
import ColorSelector from "./ColorSelector";
import SaveButton from "../../common/buttons/SaveButton";

const ClothingForm = ({
  clothing,
  onSave,
  errors = {},
  onChange,
  types,
  colors,
  onRemoveColor,
  onChangeColor,
  saving = false,
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
          <ColorSelector
            key={idx}
            label={idx === 0 ? "Color" : null}
            selectedColor={options.colors.find((color) => color.id === colorId)}
            onColorChanged={(e) => onChangeColor(e, colorId)}
            onColorDeleted={() => onRemoveColor(colorId)}
            clothingColors={clothing.colors}
            colors={options.colors}
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

      <RatingInput onChange={onChange} rating={clothing.rating} />

      <SaveButton saving={saving} />
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
  saving: PropTypes.bool,
  options: PropTypes.object,
};

export default ClothingForm;
