import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/mainAction";

class Main extends React.Component {
  render() {
    console.log(this.props);
    return (
      <>
        <div>Hello React.</div>
      </>
    );
  }
}

const mapState = (state, ownProps) => ({
  behaviorState: state.behaviorReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Main);
