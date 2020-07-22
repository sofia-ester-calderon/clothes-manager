import React from "react";
import { PropTypes } from "prop-types";

import ColorCircle from "../../common/specialForms/ColorCircle";

const ColorList = ({ onClick, colors, onAddColor }) => {
  return (
    <>
      <h2 className="mb-4">Colors</h2>
      {colors.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color) => (
              <tr
                key={color.name}
                style={{ cursor: "pointer" }}
                onClick={() => onClick(color)}
              >
                <td>{color.name}</td>
                <td>
                  <ColorCircle color={color} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn btn-dark mt-3" onClick={onAddColor}>
        Add New Color
      </button>
    </>
  );
};

ColorList.propTypes = {
  onClick: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
  onAddColor: PropTypes.func.isRequired,
};

export default ColorList;
