import React from "react";
import Row from "./Row";

const ColumnComponent = ({ ...props }) => {
  const { behaviorState, structureState, index, actions } = props;
  return (
    <div id="column">
      <div className="level">
        <div className="row" data-hierarchy="0">
          <img src="/assets/img/add.svg" className="open enable" />
          <img src="/assets/img/close.svg" className="close" />
        </div>
        <div className="row createNewDirRow">
          <input className="textbox" type="text" />
        </div>
        <Row
          structure={structureState.structure.get(index)}
          hierarchy={index}
          click_row={actions.click_row}
        />
      </div>
    </div>
  );
};

export default ColumnComponent;
