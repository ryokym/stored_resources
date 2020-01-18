import React from "react";
import Column from "./Column";

const BodyComponent = ({ ...props }) => {
  const { behaviorState, structureState, actions } = props;
  return (
    <div className="container">
      <Column
        behaviorState={behaviorState}
        structureState={structureState}
        actions={actions}
      >
        {props.children}
      </Column>
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
};

export default BodyComponent;
