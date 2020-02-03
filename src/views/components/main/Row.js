import React from "react";

class RowComponent extends React.Component {
  renderRows = items => {
    const result = items.map(item => {
      return (
        <>
          <div
            className={`row ${
              item === this.props.selected ? "highLighted" : ""
            }`}
            data-hierarchy={this.props.hierarchy}
            onClick={e =>
              this.props.clickRow({
                name: e.target.innerText,
                hierarchy: e.target.getAttribute("data-hierarchy"),
                isSelected: item === this.props.selected ? true : false
              })
            }
          >
            {item}
          </div>
        </>
      );
    });
    return result;
  };
  render() {
    const items = this.props.structure || [];
    return items.length !== 0 && this.renderRows(items);
  }
}

export default RowComponent;
