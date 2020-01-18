import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/mainAction";
import Layout from "../components/main/Layout";
import Header from "../components/main/Header";
import Body from "../components/main/Body";

class Main extends React.Component {
  componentDidMount() {
    this.props.actions.initiate();
  }

  render() {
    const { behaviorState, structureState, actions } = this.props;
    return (
      <Layout>
        <Header actions={actions} />
        <Body
          behaviorState={behaviorState}
          structureState={structureState}
          actions={actions}
        ></Body>
      </Layout>
    );
  }
}

const mapState = (state, ownProps) => ({
  behaviorState: state.behaviorReducer,
  structureState: state.structureReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Main);
