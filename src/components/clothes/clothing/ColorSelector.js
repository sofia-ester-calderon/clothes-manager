import React from "react";
import { PropTypes } from "prop-types";

import deleteIcon from "../../../assets/img/trash.png";
import styles from "./Clothing.module.css";

import SelectInput from "../../common/inputs/select/SelectInput";
import IconButton from "../../common/buttons/IconButton";
import ColorCircle from "../../common/specialForms/ColorCircle";

const ColorSelector = ({
  label,
  selectedColor,
  clothingColors = [],
  onColorChanged,
  onColorDeleted,
  colors = [],
}) => {
  function getSelectionOptions() {
    const colorsToDisplay = colors.filter(
      (color) =>
        !clothingColors.includes(color.id) || color.id === selectedColor.id
    );
    return colorsToDisplay.map((color) => ({
      value: color.id,
      text: color.name,
    }));
  }

  return (
    <div className="form-row">
      <div className="col-10">
        <SelectInput
          name="colors"
          label={label}
          value={selectedColor.id}
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
          <IconButton
            onClick={onColorDeleted}
            icon={deleteIcon}
            altText="Delete"
          />
        </div>
      </div>
    </div>
  );
};

ColorSelector.propTypes = {
  label: PropTypes.string,
  selectedColor: PropTypes.object.isRequired,
  onColorChanged: PropTypes.func.isRequired,
  onColorDeleted: PropTypes.func.isRequired,
  clothingColors: PropTypes.array,
  colors: PropTypes.array,
};

export default ColorSelector;
