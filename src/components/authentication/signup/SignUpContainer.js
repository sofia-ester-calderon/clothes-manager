import React, { useState } from "react";
import AuthenticationForm from "../AuthenticationForm";

const SignUpContainer = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState();

  function changeDetailsHandler(event) {
    const { name, value } = event.target;
    setSignUpDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function signUpHandler(event) {
    event.preventDefault();
    isFormValid();
  }

  function isFormValid() {
    const errors = {};
    if (
      !signUpDetails.email ||
      signUpDetails.email === "" ||
      !signUpDetails.email.match(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      errors.email = "Please enter a valid E-Mail";
    }
    if (!signUpDetails.password || signUpDetails.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (signUpDetails.repeatPassword !== signUpDetails.password) {
      errors.repeatPassword = "Passwords not identical";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      <h2>Create an Account</h2>
      <AuthenticationForm
        authDetails={signUpDetails}
        onChange={changeDetailsHandler}
        onSignUp={signUpHandler}
        errors={errors}
      />
    </>
  );
};

export default SignUpContainer;
