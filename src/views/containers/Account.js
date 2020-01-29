import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { accountActions } from "../actions";
import Body from "../components/account/Body";
import Menu from "../components/account/Menu";

class Account extends React.Component {
  render() {
    const { behaviorState, actions } = this.props;
    return (
      <>
        <Menu behaviorState={behaviorState} actions={actions} />
        <Body {...this.props}>{this.props.children}</Body>
      </>
    );
  }
}

const mapState = (state, ownProps) => ({
  modalState: state.modalReducer,
  formState: state.formReducer,
  behaviorState: state.behaviorReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(accountActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
