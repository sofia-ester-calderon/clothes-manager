import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ColorDetailContainer from "../colorForm/ColorDetailContainer";
import ColorList from "./ColorList";
import optionsActions from "../../../store/actions/optionsActions";

const ColorsContainer = ({ colors, initColors, ...props }) => {
  useEffect(() => {
    if (colors.length === 0) {
      initColors();
    }
  }, [colors, initColors]);

  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.id);
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList onClick={showColorHandler} colors={colors} />
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
    colors: state.options.colors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initColors: () => dispatch(optionsActions.initColors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorsContainer);
