import React from "react";
import { PropTypes } from "prop-types";
import TextInput from "../common/inputs/text/TextInput";

const AuthenticationForm = ({
  authDetails,
  onChange,
  errors = {},
  onAuthenticate,
  authType,
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
        {authType === "SIGN_UP" && (
          <TextInput
            label="Repeat Password"
            name="repeatPassword"
            value={authDetails.repeatPassword}
            onChange={onChange}
            type="password"
            error={errors.repeatPassword}
          />
        )}
        <button
          type="submit"
          className="btn btn btn-dark"
          onClick={onAuthenticate}
        >
          {authType === "SIGN_UP" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

AuthenticationForm.propTypes = {
  authDetails: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onAuthenticate: PropTypes.func.isRequired,
  authType: PropTypes.string.isRequired,
};

export default AuthenticationForm;
