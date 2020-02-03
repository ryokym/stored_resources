import React from "react";

const MenuComponent = props => {
  const { actions } = props;
  return (
    <div className="menu">
      <div className="menu_wrapper">
        <span>Do You Chenge To Mode ? </span>
        <div
          id="switcher"
          className={props.contextHover}
          onClick={() =>
            actions.clickSigninOrUp({ behavior: props.anotherBehavior })
          }
        >
          {props.anotherContext.toUpperCase()}
        </div>
      </div>
    </div>
  );
};
export default MenuComponent;
