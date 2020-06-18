import React from "react";
import { PropTypes } from "prop-types";

const SaveButton = ({ saving = false }) => {
  return (
    <button type="submit" className="btn btn btn-dark mt-3" disabled={saving}>
      {saving ? "Saving..." : "Save"}
    </button>
  );
};

SaveButton.propTypes = {
  saving: PropTypes.bool,
};

export default SaveButton;
