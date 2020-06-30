import React from "react";
import { PropTypes } from "prop-types";
import ColorCircle from "../common/specialForms/ColorCircle";

const ColorList = ({ colors, onClick }) => {
  return (
    <>
      <h2 className="mb-4">Colors</h2>
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
    </>
  );
};

ColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ColorList;
