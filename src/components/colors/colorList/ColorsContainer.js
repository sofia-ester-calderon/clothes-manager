import React from "react";
import ColorList from "./ColorList";
import { Route } from "react-router-dom";
import ColorDetailContainer from "../colorForm/ColorDetailContainer";

const ColorsContainer = (props) => {
  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.id);
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList onClick={showColorHandler} />
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
