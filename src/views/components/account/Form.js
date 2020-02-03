import React from "react";
import common from "~/utils/common";
import VerifyModal from "~/components/modals/VerifyModal";

const inputUserNameCallback = (callback, e) => {
  callback({ username: e.target.value });
};
const inputPasswordCallback = (callback, e) => {
  callback({ password: e.target.value });
};

const FormComponent = props => {
  const { behaviorState, formState, actions } = props;
  return (
    <>
      <VerifyModal {...props} />
      <div className="wrapper">
        <div className="title">
          <h1>{common.appName}</h1>
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="yourname?"
            onChange={e => inputUserNameCallback(actions.inputUserName, e)}
            value={formState.username}
          />
          <input
            type="password"
            name="password"
            placeholder="password?"
            onChange={e => inputPasswordCallback(actions.inputPassword, e)}
            value={formState.password}
          />
        </div>
        <div id="send">
          <input
            className={props.context}
            type="text"
            value={props.context.toUpperCase()}
            readonly
            onClick={() => actions.requestPost()}
          />
        </div>
      </div>
    </>
  );
};

export default FormComponent;
