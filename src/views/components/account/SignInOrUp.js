import React from "react";
import common from "../../utils/common";

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
          onChange={e => props.inputUserName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password?"
          onChange={e => props.inputPassword(e.target.value)}
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
