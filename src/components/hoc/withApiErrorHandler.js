import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { ApiErrorContext } from "../../hooks/ApiErrorProvider";

const withApiErrorHandler = (WrappedComponent) => {
  return (props) => {
    const { errorMessage, setErrorMessage } = useContext(ApiErrorContext);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (errorMessage) {
        setOpen(true);
      }
    }, [errorMessage]);

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
      },
    };

    function closeModal() {
      setOpen(false);
      setErrorMessage(null);
    }

    Modal.setAppElement("body");

    return (
      <ApiErrorContext.Consumer>
        {(value) => (
          <>
            <Modal
              isOpen={open}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Error Modal"
            >
              <div role="alert" className="text-danger">
                <h4>Sorry</h4>
                <p>Ooooops, there was an error: {errorMessage}</p>
                <p>Please try again later!</p>
                <button className="btn btn-secondary" onClick={closeModal}>
                  OK
                </button>
              </div>
            </Modal>
            <WrappedComponent {...props} />
          </>
        )}
      </ApiErrorContext.Consumer>
    );
  };
};

export default withApiErrorHandler;
