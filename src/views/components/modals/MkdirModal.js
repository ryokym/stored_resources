import React from "react";
import Modal from "react-modal";
import baseToast from "~/configureToast";
import { toast } from "react-toastify";

class MkdirModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputFocus = this.inputFocus.bind(this);
    this.clickDone = this.clickDone.bind(this);
    this.inputDirectoryNameCallback = this.inputDirectoryNameCallback.bind(
      this
    );
    this.extractPathWithOnlyDirectory = this.extractPathWithOnlyDirectory.bind(
      this
    );
    this.input = React.createRef();
    toast.configure(baseToast);
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
    toast.info("Make Directory Succeeded!");
  }

  inputDirectoryNameCallback(callback, e) {
    callback(e.target.value);
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
          onChange={e =>
            this.inputDirectoryNameCallback(actions.inputDirectoryName, e)
          }
          value={formState.dirname}
        />
        <div className="mkdir_modal_content_btns">
          <div onClick={() => this.clickDone(actions, formState.dirname)}>
            DONE
          </div>
          <div onClick={() => actions.clickCloseModal()}>DISMISS</div>
        </div>
      </Modal>
    );
  }
}

export default MkdirModalComponent;
