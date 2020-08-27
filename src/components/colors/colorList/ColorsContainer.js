import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ColorDetailContainer from "../colorForm/ColorDetailContainer";
import ColorList from "./ColorList";
import optionsActions from "../../../store/actions/optionsActions";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";

const ColorsContainer = ({
  colors,
  loadColors,
  userId,
  onlyPublicColors,
  ...props
}) => {
  useEffect(() => {
    if (
      colors.length === 0 ||
      (onlyPublicColors && userId) ||
      (!onlyPublicColors && !userId)
    ) {
      loadColors(userId);
    }
  }, [userId, loadColors, onlyPublicColors, colors]);

  function showColorHandler(color) {
    props.history.push(props.match.url + "/" + color.id);
  }

  function addNewColorHandler() {
    props.history.push(props.match.url + "/new");
  }

  return (
    <div className="row">
      <div className="col">
        <ColorList
          onClick={showColorHandler}
          colors={colors}
          onAddColor={addNewColorHandler}
          showButton={userId ? true : false}
        />
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
    userId: state.auth.userId,
    onlyPublicColors: state.options.onlyPublicOptions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadColors: (userId) => dispatch(optionsActions.loadColors(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApiErrorHandler(ColorsContainer));
