import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/accountAction";
import Body from "../components/account/Body";
import Menu from "../components/account/Menu";

class Account extends React.Component {
  render() {
    const { modeState, actions } = this.props;
    return (
      <>
        <Menu modeState={modeState} actions={actions} />
        <Body {...this.props}>{this.props.children}</Body>
      </>
    );
  }
}

const mapState = (state, ownProps) => ({
  modalState: state.modalReducer,
  formState: state.formReducer,
  modeState: state.modeReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Account);
