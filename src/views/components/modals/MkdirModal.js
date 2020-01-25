import React from "react";
import Modal from "react-modal";

class MkdirModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputFocus = this.inputFocus.bind(this);
    this.input = React.createRef();
    this.showname = this.showname.bind(this);
  }
  inputFocus(node) {
    node.current.focus();
  }

  render() {
    const { structureState, fieldState, modalFormState, actions } = this.props;
    return (
      <Modal
        isOpen={fieldState.modalIsOpen}
        className="mkdir_modal_content"
        overlayClassName="modal_overlay"
        onRequestClose={actions.clickCloseModal}
        contentRef={() => this.inputFocus(this.input)}
        onAfterClose={() => actions.breakFormEntered()}
      >
        <p className="mkdir_modal_content_title">
          CREATE IN THE FOLLOWING DIRECTORY.
        </p>
        <p className="mkdir_modal_content_workdir">{structureState.workdir}/</p>
        <input
          type="text"
          ref={this.input}
          onChange={e => actions.inputDirectoryName(e.target.value)}
        />
        <div className="mkdir_modal_content_btns">
          <div>DONE</div>
          <div>DISMISS</div>
        </div>
      </Modal>
    );
  }
}

export default MkdirModalComponent;
