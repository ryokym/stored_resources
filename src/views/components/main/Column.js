import React from "react";
import Row from "./Row";

const ColumnComponent = ({ ...props }) => {
  const { behaviorState, actions } = props;
  return (
    <div id="column">
      <div className="level" data-level="1" data-dir="">
        <Row behaviorState={behaviorState} actions={actions} />
      </div>
    </div>
  );
};

export default ColumnComponent;
