import React from "react";
import SelectInput from "../../common/inputs/SelectInput";
import { PropTypes } from "prop-types";
import styles from "./Clothing.module.css";
import DeleteButton from "../../common/buttons/DeleteButton";
import { Colors } from "../../../data/data";
import ColorCircle from "../../common/colors/ColorCircle";

const ColorSelector = ({
  label,
  selectedColor,
  clothingColors = [],
  onColorChanged,
  onColorDeleted,
}) => {
  function getSelectionOptions() {
    const colorsToDisplay = Colors.filter(
      (color) =>
        !clothingColors.includes(color.name) || color.name === selectedColor
    );
    return colorsToDisplay.map((color) => ({
      value: color.name,
      text: color.name,
    }));
  }

  return (
    <div className="form-row">
      <div className="col-10">
        <SelectInput
          name="colors"
          label={label}
          value={selectedColor}
          options={getSelectionOptions()}
          onChange={onColorChanged}
        />
      </div>
      <div className="col-1">
        <div className={[styles.icon, styles.iconCircle].join(" ")}>
          <ColorCircle color={selectedColor} />
        </div>
      </div>
      <div className="col-1">
        <div className={[styles.icon, styles.iconDelete].join(" ")}>
          <DeleteButton onDelete={onColorDeleted} />
        </div>
      </div>
    </div>
  );
};

ColorSelector.propTypes = {
  label: PropTypes.string,
  selectedColor: PropTypes.string.isRequired,
  onColorChanged: PropTypes.func.isRequired,
  onColorDeleted: PropTypes.func.isRequired,
  clothingColors: PropTypes.array,
};

export default ColorSelector;
