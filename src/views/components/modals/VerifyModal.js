import React from "react";
import Modal from "react-modal";

const VerifyModalComponent = props => {
  const { modalState, formState, actions } = props;
  return (
    <Modal
      isOpen={modalState.modalVerifyIsOpen}
      className="verify_modal_content"
      overlayClassName="modal_overlay"
      onRequestClose={actions.clickCloseModal}
      onAfterClose={() => actions.requireSigninOrUpForm({ behavior: "create" })}
    >
      <div className="verify_modal_content_wrapper">
        <p>Direction...</p>
        <p>GENERATED KEY</p>
        <p>{formState.bucketkey}</p>
        <p>
          <ol>Access 3s bucket from aws management console.</ol>
          <ol>Then select "Tag" in property settings..</ol>
          <ol>Set the above key and set arbitrary value.</ol>
          <ol>Finally, enter the same value in the input field below.</ol>
        </p>
      </div>
      <input
        type="text"
        name="bucket"
        placeholder="your S3bucketname?"
        onChange={e => actions.inputBucket({ bucket: e.target.value })}
      />
      <input
        type="password"
        name="bucketval"
        placeholder="set value"
        onChange={e => actions.inputBucketVal({ bucketval: e.target.value })}
      />
      <div className="verify_modal_content_btns">
        <div onClick={() => actions.requestPost()}>VERIFY</div>
        <div onClick={() => actions.clickCloseModal()}>DISMISS</div>
      </div>
    </Modal>
  );
};
export default VerifyModalComponent;
