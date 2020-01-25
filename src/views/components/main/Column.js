import React from "react";
import Row from "./Row";

const ColumnComponent = ({ ...props }) => {
  const { structureState, index, actions, highLight } = props;
  return (
    <div id="column">
      <div className="level">
        <Row
          structure={structureState.structure.get(index)}
          hierarchy={index}
          clickRow={actions.clickRow}
          highLight={highLight}
        />
      </div>
    </div>
  );
};

export default ColumnComponent;
