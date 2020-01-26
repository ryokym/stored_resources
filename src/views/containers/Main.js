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
    return (
      <Layout>
        <Header actions={this.props.actions} />
        <Body {...this.props}></Body>
      </Layout>
    );
  }
}

const mapState = (state, ownProps) => ({
  modalState: state.modalReducer,
  behaviorState: state.behaviorReducer,
  structureState: state.structureReducer,
  fieldState: state.fieldReducer,
  modalFormState: state.modalFormReducer
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(Main);
