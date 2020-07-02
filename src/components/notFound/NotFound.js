import React from "react";

const NotFound = (props) => {
  function redirectToHomePage() {
    props.history.push("/");
  }

  return (
    <>
      <h2>Page Not Found</h2>
      <p>Oooops... Sorry, this page doesn't exist</p>
      <button
        type="button"
        className="btn btn-link"
        onClick={redirectToHomePage}
        style={{ padding: 0 }}
      >
        Go to Home
      </button>
    </>
  );
};

export default NotFound;
