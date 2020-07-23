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
  onRemoveArrayValue,
  onChangeArrayValue,
  options,
}) => {
  function getRemainingSeasonOptions() {
    const remainingSeasons = options.seasons.filter((season) => {
      return !clothing.seasons.includes(season);
    });
    return remainingSeasons.map((season) => ({
      value: season,
      text: season,
    }));
  }

  function getRemainingColorOptions() {
    const remainingColors = options.colors.filter((optionColor) => {
      return !clothing.colors.includes(optionColor.id);
    });
    return remainingColors.map((color) => ({
      value: color.id,
      text: color.name,
    }));
  }

  const remainingSeasonOptions = getRemainingSeasonOptions();
  const remainingColorOptions = getRemainingColorOptions();

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
            onSelectionChanged={(e) => onChangeArrayValue(e, colorId, "colors")}
            onSelectionDeleted={() => onRemoveArrayValue(colorId, "colors")}
            clothingValues={clothing.colors}
            possibleOptions={options.colors}
            colorSelector={true}
          />
        );
      })}

      {remainingColorOptions.length > 0 && (
        <SelectInput
          name="colors"
          label={clothing.colors.length === 0 ? "Color" : null}
          value={""}
          defaultOption={
            clothing.colors.length === 0 ? "Select Color" : "Add New Color"
          }
          options={remainingColorOptions}
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

      {clothing.seasons.map((season, idx) => {
        return (
          <MultiOptionsSelector
            key={idx}
            label={idx === 0 ? "Season" : null}
            selectedValue={season}
            onSelectionChanged={(e) => onChangeArrayValue(e, season, "seasons")}
            onSelectionDeleted={() => onRemoveArrayValue(season, "seasons")}
            clothingValues={clothing.seasons}
            possibleOptions={options.seasons}
            colorSelector={false}
          />
        );
      })}

      {remainingSeasonOptions.length > 0 && (
        <SelectInput
          name="seasons"
          label={clothing.seasons.length === 0 ? "Season" : null}
          value={""}
          defaultOption={clothing.seasons.length === 0 ? "None" : "Add Season"}
          options={remainingSeasonOptions}
          onChange={onChange}
          error={errors.seasons}
        />
      )}

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
  onRemoveArrayValue: PropTypes.func.isRequired,
  onChangeArrayValue: PropTypes.func.isRequired,
  options: PropTypes.object,
};

export default ClothingForm;
