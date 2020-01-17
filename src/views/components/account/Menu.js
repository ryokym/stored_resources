import React from "react";

const MenuComponent = props => {
  const { modeState, actions } = props;
  return (
    <div className="menu">
      <div className="menu_wrapper">
        <span>Do You Chenge To Mode ? </span>
        <div
          id="switcher"
          className={modeState.prevHover}
          onClick={() => actions.toggleMode(modeState.mode, modeState.context)}
        >
          {modeState.prev.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default MenuComponent;
