import React from "react";

const LoginContainer = (props) => {
  function routeToSingUp() {
    props.history.push("/signup");
  }

  return (
    <>
      <h2>Login Details</h2>
      <p>You don't have an account?</p>
      <button className="btn btn btn-dark" onClick={routeToSingUp}>
        Create Account
      </button>
    </>
  );
};

export default LoginContainer;
