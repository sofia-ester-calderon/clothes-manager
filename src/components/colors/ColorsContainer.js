import React, { useState, useEffect } from "react";
import ColorList from "./ColorList";
import { Route } from "react-router-dom";
import ColorDetailContainer from "./ColorDetailContainer";
import * as api from "../../api/colorsApi";

const ColorsContainer = (props) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    async function getColorsFromApi() {
      const colorData = await api.getColors();
      setColors(colorData);
    }
    getColorsFromApi();
  }, []);

  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.id);
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList colors={colors} onClick={showColorHandler} />
      </div>
      <div className="col ml-4">
        <Route
          path={props.match.url + "/:id"}
          component={ColorDetailContainer}
        />
      </div>
    </div>
  );
};

export default ColorsContainer;
