import React from "react";
import Modal from "react-modal";

class MkdirModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputFocus = this.inputFocus.bind(this);
    this.extractPathWithOnlyDirectory = this.extractPathWithOnlyDirectory.bind(
      this
    );
    this.input = React.createRef();
  }

  inputFocus(node) {
    node.current.focus();
  }

  extractPathWithOnlyDirectory(workdir) {
    const dirs = workdir.split("/");
    const dirlist = dirs.filter((dir, index) => {
      if (index < dirs.length - 1) {
        return dir;
      }
    });
    return dirlist.join("/");
  }

  render() {
    const {
      modalState,
      structureState,
      fieldState,
      formState,
      actions
    } = this.props;
    this.path = fieldState.isview
      ? this.extractPathWithOnlyDirectory(structureState.workdir)
      : structureState.workdir;
    return (
      <Modal
        isOpen={modalState.modalMkdirIsOpen}
        onAfterOpen={actions.requireMkdirForm}
        className="mkdir_modal_content"
        overlayClassName="modal_overlay"
        onRequestClose={actions.clickCloseModal}
        contentRef={() => this.inputFocus(this.input)}
        onAfterClose={() => actions.breakMkdirForm()}
      >
        <p className="mkdir_modal_content_title">
          CREATE IN THE FOLLOWING DIRECTORY.
        </p>
        <p className="mkdir_modal_content_workdir">{this.path}/</p>
        <input
          type="text"
          ref={this.input}
          onChange={e => actions.inputDirectoryName(e.target.value)}
        />
        <div className="mkdir_modal_content_btns">
          <div
            onClick={() =>
              actions.makeDirectory({
                name: formState.dirname,
                path: this.path
              })
            }
          >
            DONE
          </div>
          <div onClick={() => actions.clickCloseModal()}>DISMISS</div>
        </div>
      </Modal>
    );
  }
}

export default MkdirModalComponent;
