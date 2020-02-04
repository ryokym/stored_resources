import React from "react";
import Modal from "react-modal";

const RemoveModalComponent = props => {
  const { modalState, structureState, workState, actions } = props;
  return (
    <Modal
      isOpen={modalState.modalRemoveIsOpen}
      className="remove_modal_content"
      overlayClassName="modal_overlay"
      onRequestClose={actions.clickCloseModal}
      onAfterClose={() => actions.breakWorkingResource()}
    >
      <p className="remove_modal_content_title">
        Are you sure you want to delete the following resources ?
      </p>
      <p className="remove_modal_content_target">
        {`${workState.path}/${workState.name}`}
      </p>
      <div className="remove_modal_content_btns">
        <div
          onClick={() =>
            actions.removeResource({
              name: workState.name,
              path: workState.path,
              isSelected: workState.isSelected,
              hierarchy: workState.hierarchy
            })
          }
        >
          SURE
        </div>
        <div
          onClick={() =>
            actions.clickCloseModal({
              modalIsOpen: false
            })
          }
        >
          CANCEL
        </div>
      </div>
    </Modal>
  );
};

export default RemoveModalComponent;
