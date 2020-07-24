import React from "react";
import { PropTypes } from "prop-types";
import TextInput from "../common/inputs/text/TextInput";

const AuthenticationForm = ({
  authDetails,
  onChange,
  errors = {},
  onSignUp,
}) => {
  return (
    <div className="col-4 mt-4">
      <form>
        <TextInput
          label="E-Mail"
          name="email"
          value={authDetails.email}
          onChange={onChange}
          error={errors.email}
        />
        <TextInput
          label="Password"
          name="password"
          value={authDetails.password}
          onChange={onChange}
          type="password"
          error={errors.password}
        />
        <TextInput
          label="Repeat Password"
          name="repeatPassword"
          value={authDetails.repeatPassword}
          onChange={onChange}
          type="password"
          error={errors.repeatPassword}
        />
        <button type="submit" className="btn btn btn-dark" onClick={onSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

AuthenticationForm.propTypes = {
  authDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onSignUp: PropTypes.func.isRequired,
};

export default AuthenticationForm;
