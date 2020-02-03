import React from "react";
import Modal from "react-modal";
import common from "../../utils/common";

class MkdirModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputFocus = this.inputFocus.bind(this);
    this.clickDone = this.clickDone.bind(this);
    this.inputDirectoryNameCallback = this.inputDirectoryNameCallback.bind(
      this
    );
    this.input = React.createRef();
  }

  inputFocus(node) {
    node.current.focus();
  }

  clickDone(actions, dirname) {
    actions.makeDirectory({
      name: dirname,
      path: this.path
    });
    this.inputFocus(this.input);
  }

  inputDirectoryNameCallback(callback, e) {
    callback({ dirname: e.target.value });
  }

  render() {
    const {
      modalState,
      structureState,
      fieldState,
      formState,
      actions
    } = this.props;
    const { workdir } = structureState;
    this.path = fieldState.isview
      ? common.rebuildPathForSpecifiedHierarchy(
          workdir,
          common.getHierarchy(workdir) - 1
        )
      : workdir;
    return (
      <Modal
        isOpen={modalState.modalMkdirIsOpen}
        onAfterOpen={() => actions.requireMkdirForm({ behavior: "mkdir" })}
        className="mkdir_modal_content"
        overlayClassName="modal_overlay"
        onRequestClose={actions.clickCloseModal}
        contentRef={() => this.inputFocus(this.input)}
        onAfterClose={() =>
          actions.breakMkdirForm({ behavior: "change", dirname: "" })
        }
      >
        <p className="mkdir_modal_content_title">
          CREATE IN THE FOLLOWING DIRECTORY.
        </p>
        <p className="mkdir_modal_content_workdir">{this.path}/</p>
        <input
          type="text"
          ref={this.input}
          onChange={e =>
            this.inputDirectoryNameCallback(actions.inputDirectoryName, e)
          }
          value={formState.dirname}
        />
        <div className="mkdir_modal_content_btns">
          <div onClick={() => this.clickDone(actions, formState.dirname)}>
            DONE
          </div>
          <div
            onClick={() =>
              actions.clickCloseModal({
                modalIsOpen: false
              })
            }
          >
            DISMISS
          </div>
        </div>
      </Modal>
    );
  }
}

export default MkdirModalComponent;
