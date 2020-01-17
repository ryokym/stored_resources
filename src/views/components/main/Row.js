import React from "react";

const RowComponent = ({ ...props }) => {
  const { behaviorState, actions } = props;
  console.log(behaviorState);
  return (
    <>
      <div className="row">
        <img src="/assets/img/add.svg" className="open enable" />
        <img src="/assets/img/close.svg" className="close" />
        {behaviorState.behavior}
      </div>
      <div className="row createNewDirRow">
        <input className="textbox" type="text" />
      </div>
      <div className="row">
        <p className="row_item"></p>
      </div>
    </>
  );
};

export default RowComponent;
