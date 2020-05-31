import React from "react";
import SelectInput from "../../common/inputs/select/SelectInput";
import RatingInput from "../../common/inputs/rating/RatingInput";
import { Categories, Occasion } from "../../../data/data";
import ColorSelector from "./ColorSelector";
import { PropTypes } from "prop-types";

const ClothingForm = ({
  clothing,
  onSave,
  errors = {},
  onChange,
  types,
  colors,
  onRemoveColor,
  onChangeColor,
}) => {
  return (
    <form onSubmit={onSave}>
      <h2 className="mb-4">
        {clothing.id ? "Edit" : "Add New Piece of"} Clothing
      </h2>
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
          value: type.name,
          text: type.name,
        }))}
        onChange={onChange}
        error={errors.type}
        disabled={types.length === 0}
      />

      {clothing.colors.map((color, idx) => {
        return (
          <ColorSelector
            key={idx}
            label={idx === 0 ? "Color" : null}
            selectedColor={color}
            onColorChanged={(e) => onChangeColor(e, color)}
            onColorDeleted={() => onRemoveColor(color)}
            clothingColors={clothing.colors}
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
            value: color.name,
            text: color.name,
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
};

export default ClothingForm;
