import React from "react";
import common from "../../utils/common";

const inputUserNameCallback = (callback, e) => {
  callback(e.target.value);
};
const inputPasswordCallback = (callback, e) => {
  callback(e.target.value);
};

const FormComponent = props => {
  const { modeState, formState, actions } = props;
  return (
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
          className={modeState.context}
          type="text"
          value={modeState.context.toUpperCase()}
          readonly
          onClick={() => actions.requestPost()}
        />
      </div>
    </div>
  );
};

export default FormComponent;
