import React from "react";
import SelectInput from "../../common/inputs/select/SelectInput";
import { PropTypes } from "prop-types";
import styles from "./Clothing.module.css";
import IconButton from "../../common/buttons/IconButton";
import { Colors } from "../../../data/data";
import ColorCircle from "../../common/specialForms/ColorCircle";
import deleteIcon from "../../../assets/img/trash.png";

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
          <IconButton onClick={onColorDeleted} icon={deleteIcon} />
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
