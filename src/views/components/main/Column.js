import React from "react";
import Row from "./Row";

const ColumnComponent = ({ ...props }) => {
  const { structureState, index, actions, selected } = props;
  return (
    <div id="column">
      <div className="level">
        <Row
          structure={structureState.structure.get(index)}
          hierarchy={index}
          clickRow={actions.clickRow}
          selected={selected}
        />
      </div>
    </div>
  );
};

export default ColumnComponent;
