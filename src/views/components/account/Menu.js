import React from "react";

const CreateAccountComponent = props => {
  return (
    <div className="menu">
      <div className="menu_wrapper">
        <span>Do You Chenge To Mode ? </span>
        <div
          id="switcher"
          className={props.prevHover}
          onClick={() => props.toggleMode(props.mode, props.context)}
        >
          {props.prev.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default CreateAccountComponent;
