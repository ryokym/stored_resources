import React from "react";
import common from "../../utils/common";

const SignUpComponent = props => {
  return (
    <div class="modal">
      <div>
        <img id="close" src="/app/assets/img/close.svg" />
      </div>
      <div class="modal_key">
        <span>Generated Key</span>
        <div id="ukey"></div>
        <input type="hidden" name="bucketkey" />
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
        <input type="text" name="bucket" placeholder="your S3bucketname?" />
        <input type="password" name="bucketval" placeholder="set value" />
      </div>
      <div id="send">
        <input
          class="sign_in_bk switch_bk"
          type="text"
          value="Enter"
          readonly
        />
      </div>
    </div>
  );
};
export default SignUpComponent;
