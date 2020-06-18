import React from "react";
import { Colors } from "../../data/data";
import ColorList from "./ColorList";
import { Route } from "react-router-dom";
import ColorDetailContainer from "./ColorDetailContainer";

const ColorsContainer = (props) => {
  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.name);
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList colors={Colors} onClick={showColorHandler} />
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
