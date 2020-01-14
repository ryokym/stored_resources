import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import SignInOrUp from "../components/account/SignInOrUp";
import CreateAccount from "../components/account/CreateAccount";

const view = (modeState, formState, actions) => {
  return modeState.mode === "verify" ? (
    <CreateAccount
      inputBucket={actions.inputBucket}
      inputBucketVal={actions.inputBucketVal}
      bucketkey={modeState.bucketkey}
      closeModal={actions.closeModal}
      requestPost={actions.requestPost}
    />
  ) : (
    <SignInOrUp
      context={modeState.context}
      inputUserName={actions.inputUserName}
      inputPassword={actions.inputPassword}
      username={formState.username}
      password={formState.password}
      requestPost={actions.requestPost}
    />
  );
};
class Account extends React.Component {
  render() {
    const { formState, modeState, actions } = this.props;
    return (
      <React.Fragment>
        <div className="menu">
          <div className="menu_wrapper">
            <span>Do You Chenge To Mode ? </span>
            <div
              id="switcher"
              className={modeState.prevHover + " switch_txt"}
              onClick={() =>
                actions.toggleMode(modeState.mode, modeState.context)
              }
            >
              {modeState.prev.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="container">
          <form name="form">{view(modeState, formState, actions)}</form>
        </div>
      </React.Fragment>
    );
  }
}

const mapState = (state, ownProps) => ({
  formState: state.formReducer,
  modeState: state.modeReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
