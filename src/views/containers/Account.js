import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import common from "../utils/common";
import SignInOrUp from "../components/account/SignInOrUp";
import CreateAccount from "../components/account/CreateAccount";

const view = (account, actions) => {
  return account.mode === "verify" ? (
    <CreateAccount
      inputBucket={actions.inputBucket}
      inputBucketVal={actions.inputBucketVal}
      bucketkey={account.bucketkey}
      closeModal={actions.closeModal}
      requestPost={actions.requestPost}
    />
  ) : (
    <SignInOrUp
      context={account.context}
      inputUserName={actions.inputUserName}
      inputPassword={actions.inputPassword}
      username={account.username}
      password={account.password}
      requestPost={actions.requestPost}
    />
  );
};
class Account extends React.Component {
  render() {
    const { account, actions } = this.props;
    return (
      <React.Fragment>
        <div className="menu">
          <div className="menu_wrapper">
            <span>Do You Chenge To Mode ? </span>
            <div
              id="switcher"
              className={account.prevHover + " switch_txt"}
              onClick={() => actions.toggleMode()}
            >
              {account.prev.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="container">
          <form name="form">{view(account, actions)}</form>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state, ownProps) => ({
  account: state.account
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
