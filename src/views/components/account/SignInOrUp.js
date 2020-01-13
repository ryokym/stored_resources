import React from "react";
import common from "../../utils/common";

const inputUserNameCallback = (callback, e) => {
  callback(e.target.value);
};
const inputPasswordCallback = (callback, e) => {
  callback(e.target.value);
};

const SignInOrUpComponent = props => {
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
          onChange={e => inputUserNameCallback(props.inputUserName, e)}
          value={props.username}
        />
        <input
          type="password"
          name="password"
          placeholder="password?"
          onChange={e => inputPasswordCallback(props.inputPassword, e)}
          value={props.password}
        />
      </div>
      <div id="send">
        <input
          className={props.context}
          type="text"
          value={props.context.toUpperCase()}
          readonly
          onClick={() => props.requestPost()}
        />
      </div>
    </div>
  );
};

export default SignInOrUpComponent;
