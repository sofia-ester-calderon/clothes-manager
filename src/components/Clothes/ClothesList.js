import React from "react";

const clothesList = (props) => {
  return (
    <>
      <p>
        {props.name}, {props.color}
      </p>
    </>
  );
};

export default clothesList;
