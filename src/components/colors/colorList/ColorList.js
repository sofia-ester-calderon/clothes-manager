import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import ColorCircle from "../../common/specialForms/ColorCircle";
import { AllColorsContext } from "../../../hooks/AllColorsProvider";

const ColorList = ({ onClick }) => {
  const colors = useContext(AllColorsContext);

  return (
    <AllColorsContext.Consumer>
      {() => {
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
          </>
        );
      }}
    </AllColorsContext.Consumer>
  );
};

ColorList.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ColorList;
