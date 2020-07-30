import React, { useState, useContext, useEffect } from "react";
import AuthenticationForm from "../AuthenticationForm";
import authActions from "../../../store/actions/authActions";
import { connect } from "react-redux";
import withApiErrorHandler from "../../hoc/withApiErrorHandler";
import { ApiErrorContext } from "../../../hooks/ApiErrorProvider";
import { toast } from "react-toastify";

const LoginContainer = ({ login, ...props }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginStarted, setLoginStarted] = useState(false);
  const { apiStatus } = useContext(ApiErrorContext);

  useEffect(() => {
    if (loginStarted && apiStatus.apiCallMethod === "post") {
      props.history.push("/");
      toast.success("You are logged in");
    }
    // eslint-disable-next-line
  }, [apiStatus, props.history]);

  function changeDetailsHandler(event) {
    const { name, value } = event.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function loginHandler(event) {
    event.preventDefault();
    setLoginStarted(true);
    login(loginDetails);
  }

  function routeToSingUp() {
    props.history.push("/signup");
  }

  return (
    <>
      <h2>Login Details</h2>
      <AuthenticationForm
        authDetails={loginDetails}
        onChange={changeDetailsHandler}
        onAuthenticate={loginHandler}
        authType="LOGIN"
      />
      <p className="mt-4">You don't have an account yet?</p>
      <button className="btn btn btn-dark" onClick={routeToSingUp}>
        Create Account
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginDetails) => dispatch(authActions.login(loginDetails)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withApiErrorHandler(LoginContainer));
