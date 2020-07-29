import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import {
  ApiErrorContext,
  ERROR_TYPE_GENERIC,
  ERROR_TYPE_SESSION,
  ERROR_TYPE_SIGN_UP,
  ERROR_TYPE_LOGIN,
} from "../../hooks/ApiErrorProvider";
import Spinner from "../common/spinner/Spinner";

const withApiErrorHandler = (WrappedComponent) => {
  return (props) => {
    const { apiStatus, setApiStatus } = useContext(ApiErrorContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (apiStatus.errorMessage || apiStatus.loading) {
        setOpen(true);
      }
      if (!apiStatus.errorMessage && !apiStatus.loading) {
        setOpen(false);
      }
    }, [apiStatus]);

    const customStyles = {
      content: {
        height: "30%",
        width: "50%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    const btnStyle = {
      position: "absolute",
      bottom: "15px",
    };

    function btnClickHandler() {
      if (btnText === "Login") {
        props.history.push("/login");
      }
      closeModal();
    }

    function closeModal() {
      if (!apiStatus.loading) {
        setOpen(false);
        setApiStatus({
          loading: false,
          errorMessage: null,
          apiCallMethod: null,
          errorType: null,
        });
      }
    }

    let title = "";
    let subtitle = "";
    let btnText = "";
    switch (apiStatus.errorType) {
      case ERROR_TYPE_GENERIC:
        title = "Sorry";
        subtitle = "Ooooops, there was an error! Please try again later";
        btnText = "OK";
        break;
      case ERROR_TYPE_SESSION:
        title = "Your session has expired!";
        subtitle = "Please login again";
        btnText = "Login";
        break;
      case ERROR_TYPE_SIGN_UP:
        title = "Could Not Create Account";
        subtitle = "Please try with different credentials";
        btnText = "OK";
        break;
      case ERROR_TYPE_LOGIN:
        title = "Could Not Login";
        subtitle = "Please try with different credentials";
        btnText = "OK";
        break;
      default:
        title = "Sorry";
    }

    Modal.setAppElement("body");

    return (
      <ApiErrorContext.Consumer>
        {() => (
          <>
            <Modal
              isOpen={open}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Error Modal"
            >
              {apiStatus.errorMessage && (
                <div role="alert">
                  <h4 className="mb-3">{title}</h4>
                  <p>{subtitle}</p>
                  <p>{apiStatus.errorMessage}</p>
                  <button
                    style={btnStyle}
                    className="btn btn btn-dark"
                    onClick={btnClickHandler}
                  >
                    {btnText}
                  </button>
                </div>
              )}
              {apiStatus.loading && (
                <>
                  {" "}
                  <Spinner />
                  <h4 style={btnStyle}>Loading...</h4>
                </>
              )}
            </Modal>
            <WrappedComponent {...props} />
          </>
        )}
      </ApiErrorContext.Consumer>
    );
  };
};

export default withApiErrorHandler;
