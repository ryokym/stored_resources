import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/accountAction";
import Body from "../components/account/Body";
import Menu from "../components/account/Menu";

class Account extends React.Component {
  render() {
    const { formState, modeState, actions } = this.props;
    return (
      <>
        <Menu modeState={modeState} actions={actions} />
        <Body formState={formState} modeState={modeState} actions={actions}>
          {this.props.children}
        </Body>
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
