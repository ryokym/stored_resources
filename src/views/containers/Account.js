import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/accountAction";
import Menu from "../components/account/Menu";
import SignInOrUp from "../components/account/SignInOrUp";
import CreateAccount from "../components/account/CreateAccount";

const view = (modeState, formState, actions) => {
  return modeState.mode === "verify" ? (
    <CreateAccount
      mode={modeState.mode}
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
      <>
        <Menu
          mode={modeState.mode}
          context={modeState.context}
          prevHover={modeState.prevHover}
          toggleMode={actions.toggleMode}
          prev={modeState.prev}
        />
        {view(modeState, formState, actions)}
      </>
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
