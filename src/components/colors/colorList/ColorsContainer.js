import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ColorDetailContainer from "../colorForm/ColorDetailContainer";
import ColorList from "./ColorList";

const ColorsContainer = (props) => {
  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.id);
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList onClick={showColorHandler} colors={props.colors} />
        <button className="btn btn btn-dark mt-3">Add New Color</button>
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

const mapStateToProps = (state) => {
  return {
    colors: state.colors,
  };
};

export default connect(mapStateToProps)(ColorsContainer);
