import React from "react";
import { PropTypes } from "prop-types";

import deleteIcon from "../../../assets/img/trash.png";
import styles from "./Clothing.module.css";

import SelectInput from "../../common/inputs/select/SelectInput";
import IconButton from "../../common/buttons/IconButton";
import ColorCircle from "../../common/specialForms/ColorCircle";

const MultiOptionsSelector = ({
  label,
  selectedValue,
  clothingValues = [],
  onSelectionChanged,
  onSelectionDeleted,
  possibleOptions = [],
  colorSelector = false,
}) => {
  function getSelectionOptions() {
    const optionsToDisplay = possibleOptions.filter((option) => {
      if (option.id) {
        return (
          !clothingValues.includes(option.id) || option.id === selectedValue.id
        );
      }
      return !clothingValues.includes(option) || option === selectedValue;
    });
    return optionsToDisplay.map((option) => ({
      value: option.id ? option.id : option,
      text: option.name ? option.name : option,
    }));
  }

  const colStyle = colorSelector ? "col-10" : "col-11";

  return (
    <div className="form-row">
      <div className={colStyle}>
        <SelectInput
          name="colors"
          label={label}
          value={selectedValue.id ? selectedValue.id : selectedValue}
          options={getSelectionOptions()}
          onChange={onSelectionChanged}
        />
      </div>
      {colorSelector && (
        <div className="col-1">
          <div className={[styles.icon, styles.iconCircle].join(" ")}>
            <ColorCircle color={selectedValue} />
          </div>
        </div>
      )}

      <div className="col-1">
        <div className={[styles.icon, styles.iconDelete].join(" ")}>
          <IconButton
            onClick={onSelectionDeleted}
            icon={deleteIcon}
            altText="Delete"
          />
        </div>
      </div>
    </div>
  );
};

MultiOptionsSelector.propTypes = {
  label: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  onSelectionChanged: PropTypes.func.isRequired,
  onSelectionDeleted: PropTypes.func.isRequired,
  clothingValues: PropTypes.array,
  possibleOptions: PropTypes.array,
  colorSelector: PropTypes.bool,
};

export default MultiOptionsSelector;
