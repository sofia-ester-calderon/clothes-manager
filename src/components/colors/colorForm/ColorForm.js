import React from "react";
import TextInput from "../../common/inputs/text/TextInput";
import { PropTypes } from "prop-types";
import { ChromePicker } from "react-color";

const ColorForm = ({ color, onChangeColor, onSave, onCancel, errors = {} }) => {
  return (
    <>
      <h2>{color.id ? "Color Details" : "New Color"}</h2>
      <form onSubmit={onSave}>
        <TextInput
          label="Name"
          name="name"
          value={color.name}
          onChange={onChangeColor}
          error={errors.name}
        />
        <label className="font-weight-bold">Color</label>
        <ChromePicker color={color.hash} onChangeComplete={onChangeColor} />

        <button type="submit" className="btn btn btn-dark mt-3">
          Save
        </button>
        <button className="btn btn btn-secondary mt-3 ml-3" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
};

ColorForm.propTypes = {
  color: PropTypes.object.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ColorForm;
