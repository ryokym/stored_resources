import React from "react";

const renderRows = items => {
  const result = items.map(item => {
    return (
      <>
        <div className="row" data-hierarchy="0" data-path="">
          <p className="row_item">{item}</p>
        </div>
      </>
    );
  });
  return result;
};
const RowComponent = structure => {
  const items = Object.values(structure)[0];
  return items.length !== 0 && renderRows(items);
};

export default RowComponent;
