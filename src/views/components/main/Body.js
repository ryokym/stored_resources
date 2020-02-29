import React from "react";
import Column from "./Column";
import UploadField from "./fields/UploadField";
import PreviewField from "./fields/PreviewField";
import RemoveField from "./fields/RemoveField";
import MkdirModal from "~/components/modals/MkdirModal";
import RemoveModal from "~/components/modals/RemoveModal";
import ModuleExpand from "~/utils/modules/expand";

class BodyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.renderColumns = this.renderColumns.bind(this);
    this.side = React.createRef();
    this.display = React.createRef();
    this.width = 0;
  }

  componentDidMount() {
    this.side = this.side.current;
    this.display = this.display.current;
  }

  renderField(fieldState) {
    if (fieldState.isremove === true) {
      return <RemoveField />;
    } else if (fieldState.isview === true) {
      return <PreviewField text={fieldState.content} />;
    } else {
      return <UploadField actions={this.props.actions} />;
    }
  }

  renderColumns(props) {
    const { structureState, actions } = props;
    if (structureState.structure.size > 0) {
      const items = structureState.workdir.split("/");
      const size = structureState.structure.size;
      const sizes = [...Array(size).keys()];
      const result = sizes.map(index => {
        return (
          <Column
            structureState={structureState}
            index={index}
            actions={actions}
            selected={items[index] || ""}
          >
            {this.props.children}
          </Column>
        );
      });
      return result;
    }
  }

  collapseSideIfNeeded(isview, ...props) {
    this.width = isview === true && ModuleExpand([this.width, ...props]);
  }

  render() {
    const { fieldState, behaviorState } = this.props;
    this.collapseSideIfNeeded(
      fieldState.isview,
      behaviorState.behavior,
      this.side,
      this.display
    );
    return (
      <div className="container">
        <div id="side" ref={this.side}>
          {this.renderColumns(this.props)}
        </div>
        <div id="display" ref={this.display}>
          <div>{this.renderField(fieldState)}</div>
        </div>
        <MkdirModal {...this.props} />
        <RemoveModal {...this.props} />
      </div>
    );
  }
}

export default BodyComponent;
