import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { ApiErrorContext } from "../../hooks/ApiErrorProvider";
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
      if (apiStatus.authError) {
        props.history.push("/login");
      }
      closeModal();
    }

    function closeModal() {
      if (!apiStatus.loading) {
        setOpen(false);
        setApiStatus({ loading: false, errorMessage: null });
      }
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
                <div role="alert" className="text-danger">
                  <h4>
                    {apiStatus.authError
                      ? "Your session has expired!"
                      : "Sorry"}
                  </h4>
                  <p>
                    {apiStatus.authError
                      ? "Please login again"
                      : `Ooooops, there was an error! Please try again later`}
                  </p>
                  <p>{apiStatus.errorMessage}</p>
                  <button
                    style={btnStyle}
                    className="btn btn-secondary"
                    onClick={btnClickHandler}
                  >
                    {apiStatus.authError ? "Login" : "OK"}
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
