import React from "react";

const MenuComponent = props => {
  const { behaviorState, actions } = props;
  return (
    <div className="menu">
      <div className="menu_wrapper">
        <span>Do You Chenge To Mode ? </span>
        <div
          id="switcher"
          className={behaviorState.prevHover}
          onClick={() =>
            actions.clickSigninOrUp(
              behaviorState.behavior,
              behaviorState.context
            )
          }
        >
          {behaviorState.prev.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default MenuComponent;
