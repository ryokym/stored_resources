import React from "react";

const RowComponent = ({ ...props }) => {
  const { behaviorState, actions } = props;
  console.log(behaviorState);
  return (
    <>
      <div className="row" data-hierarchy="0" data-path="">
        <p className="row_item">{behaviorState.behavior}</p>
      </div>
    </>
  );
};

export default RowComponent;
