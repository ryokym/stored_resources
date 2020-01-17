import React from "react";

const ModalComponent = props => {
  const { formState, actions } = props;
  return (
    <div class="modal">
      <div>
        <img
          id="close"
          src="/assets/img/close.svg"
          onClick={actions.closeModal}
        />
      </div>
      <div class="modal_key">
        <span>Generated Key</span>
        <div id="ukey">{formState.bucketkey}</div>
      </div>
      <div class="modal_info">
        <span>Direction...</span>
        <div>
          <ol>Access 3s bucket from aws management console.</ol>
          <ol>Then select "Tag" in property settings..</ol>
          <ol>Set the above key and set arbitrary value.</ol>
          <ol>Finally, enter the same value in the input field below.</ol>
        </div>
      </div>
      <div>
        <input
          type="text"
          name="bucket"
          placeholder="your S3bucketname?"
          onChange={e => actions.inputBucket(e.target.value)}
        />
        <input
          type="password"
          name="bucketval"
          placeholder="set value"
          onChange={e => actions.inputBucketVal(e.target.value)}
        />
      </div>
      <div id="send">
        <input
          type="text"
          value="Verify"
          readonly
          onClick={() => actions.requestPost()}
        />
      </div>
    </div>
  );
};
export default ModalComponent;
