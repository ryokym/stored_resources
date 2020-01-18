import React from "react";
import Common from "../../utils/common";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  mapMaterialToAction = [
    ["expand.svg", "click_expand"],
    ["remove.svg", "click_remove"],
    ["download.svg", "click_download"],
    ["edit.svg", "click_edit"],
    ["logout.svg", "click_logout"]
  ];

  renderMenuitems = (list, actions) => {
    const result = list.map(ary => {
      const [material, action] = ary;
      return (
        <div className="menu_item">
          <img
            onClick={typeof actions[action] === "function" && actions[action]}
            className="menu_items menu_item_icon"
            src={`/assets/img/${material}`}
          />
        </div>
      );
    });
    return result;
  };

  render() {
    return (
      <div className="header">
        <div id="title" contenteditable="true">
          {Common.appName}
        </div>
        <div className="menu">
          {this.renderMenuitems(this.mapMaterialToAction, this.props.actions)}
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
