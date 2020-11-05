import React from "react";
import TextInput from "../../common/inputs/text/TextInput";
import { PropTypes } from "prop-types";
import { ChromePicker } from "react-color";

const ColorForm = ({
  color,
  onChangeColor,
  onSave,
  onCancel,
  onDelete,
  errors = {},
}) => {
  const editable = color.userId !== "all";
  const cancelClassName = editable
    ? "btn btn btn-secondary mt-3 ml-3"
    : "btn btn btn-secondary mt-3";

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
          disabled={!editable}
        />
        <label className="font-weight-bold">Color</label>
        <ChromePicker color={color.hash} onChangeComplete={onChangeColor} />

        {editable && (
          <button type="submit" className="btn btn btn-dark mt-3">
            Save
          </button>
        )}
        {color.id && editable && (
          <button
            className="btn btn btn-secondary mt-3 ml-3"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
        <button className={cancelClassName} onClick={onCancel}>
          Cancel
        </button>
        {!editable && (
          <p className="text-info mt-3">Public colors cannot be edited</p>
        )}
      </form>
    </>
  );
};

ColorForm.propTypes = {
  color: PropTypes.object.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ColorForm;
