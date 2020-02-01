import React from "react";
import Common from "~/utils/common";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderMenuitems = this.renderMenuitems.bind(this);
  }

  mapMaterialToAction = [
    ["mkdir.svg", "clickOpenModalMkdir"],
    ["expand.svg", "clickExpand"],
    ["remove.svg", "clickRemove"],
    ["download.svg", "clickDownload"],
    ["edit.svg", "clickEdit"],
    ["logout.svg", "clickLogout"]
  ];

  disabledIfNeeded(action, fieldState) {
    if (action !== "clickRemove" && fieldState.isremove === true) {
      return "disabledIcon";
    } else {
      return "";
    }
  }

  renderMenuitems(list, actions, fieldState) {
    const result = list.map(ary => {
      const [material, action] = ary;
      return (
        <div className="menu_item">
          <img
            onClick={typeof actions[action] === "function" && actions[action]}
            className={`menu_items menu_item_icon ${this.disabledIfNeeded(
              action,
              fieldState
            )}`}
            src={`/assets/img/${material}`}
          />
        </div>
      );
    });
    return result;
  }

  render() {
    const { actions, fieldState } = this.props;
    return (
      <div className="header">
        <div id="title" contenteditable="true">
          {Common.appName}
        </div>
        <div className="menu">
          {this.renderMenuitems(this.mapMaterialToAction, actions, fieldState)}
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
