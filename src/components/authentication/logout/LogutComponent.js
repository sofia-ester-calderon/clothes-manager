import React, { useEffect } from "react";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";
import authActions from "../../../store/actions/authActions";
import { connect } from "react-redux";

const LogoutComponent = ({ logout, ...props }) => {
  useEffect(() => {
    logout();
    props.history.push("/");
  }, [props.history, logout]);
  return <></>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withApiErrorHandler(LogoutComponent));
