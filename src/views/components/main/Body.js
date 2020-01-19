import React from "react";
import Column from "./Column";

class BodyComponent extends React.Component {
  renderColumns = props => {
    const { behaviorState, structureState, actions } = props;
    if (structureState.structure.size > 0) {
      const size = structureState.structure.size;
      const sizes = [...Array(size).keys()];
      const result = sizes.map(index => {
        return (
          <Column
            behaviorState={behaviorState}
            structureState={structureState}
            index={index}
            actions={actions}
          >
            {this.props.children}
          </Column>
        );
      });
      return result;
    }
  };

  render() {
    return (
      <div className="container">
        {this.renderColumns(this.props)}
        <div id="display">
          <div id="toggles">
            <div id="upload_area">
              <img id="upload_drop_area" src="/assets/img/dragDrop.svg" />
            </div>
            <pre id="preview">
              <code className="prettyprint"></code>
            </pre>
            <div id="remove_area">
              <div id="remove_drop_area">
                <img src="/assets/img/trush.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BodyComponent;
